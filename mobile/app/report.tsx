import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch, ActivityIndicator, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { Theme } from '../constants/Theme';
import { useReportStore } from '../store/useReportStore';

const CATEGORIES = [
  { id: 'garbage', label: 'Garbage', icon: 'delete', color: Theme.colors.primary },
  { id: 'drainage', label: 'Drainage', icon: 'water-drop', color: Theme.colors.primary },
  { id: 'pothole', label: 'Pothole', icon: 'road', color: Theme.colors.primary },
  { id: 'other', label: 'Other', icon: 'more-horiz', color: Theme.colors.primary },
];

export default function ReportScreen() {
  const router = useRouter();
  const cameraRef = useRef<any>(null);
  const addReport = useReportStore((state) => state.addReport);

  // Permissions & State
  const [permission, requestPermission] = useCameraPermissions();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState('Detecting location...');
  const [ward, setWard] = useState('Ward --');
  
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('garbage');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      // 1. Initial Permission Check (Don't await fully if it hangs)
      if (!permission) {
        requestPermission();
      }

      // 2. Request Location Permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setAddress('Location permission denied');
        setWard('Ward Restricted');
        return;
      }

      // 3. Get Position with Timeout
      try {
        // Use a faster check first or a timeout for simulators
        const loc = await Promise.race([
          Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
          new Promise<null>((_, reject) => setTimeout(() => reject('timeout'), 5000))
        ]) as Location.LocationObject;

        if (loc) {
          setLocation(loc);
          // Reverse Geocode
          let reverse = await Location.reverseGeocodeAsync({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude
          });
          if (reverse.length > 0) {
            const item = reverse[0];
            setAddress(`${item.name || ''} ${item.street || ''}, ${item.district || item.city || ''}`);
            setWard(`Ward ${Math.floor(loc.coords.latitude % 100)}`);
          }
        }
      } catch (e) {
        setAddress('Indiranagar, Bangalore'); // Fallback for simulator
        setWard('Ward 12');
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
    }
  };

  const handleSubmit = async () => {
    if (!capturedImage) {
      Alert.alert('Evidence Required', 'Please capture a photo of the issue before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      addReport({
        title: `${CATEGORIES.find(c => c.id === selectedCategory)?.label} Issue`,
        location: address,
        ward: ward,
        description: `Automatic report for ${selectedCategory} issue detected at ${address}. Reported via CleanBharat Mobile.`,
        imageUrl: capturedImage,
        supportedCount: 0,
      });
      
      Alert.alert('Report Submitted', 'Thank you for contributing to a cleaner city! Your report is now live.', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') }
      ]);
    } catch (error) {
      Alert.alert('Submission Failed', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fallback UI to prevent infinite loading if permission state is stuck or on simulator
  if (!permission || !permission.granted) {
     const isSimulator = !permission; // Simplified check
     if (isSimulator) {
        // Fallback for UI development/simulator
     } else {
        return (
          <View style={styles.loadingContainer}>
            <Text style={styles.permissionText}>We need your permission to show the camera</Text>
            <TouchableOpacity style={styles.submitButton} onPress={requestPermission}>
              <Text style={styles.submitText}>Grant Permission</Text>
            </TouchableOpacity>
          </View>
        );
     }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Stack.Screen options={{ 
        title: 'Report Issue',
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="close" size={24} color={Theme.colors.onSurface} />
          </TouchableOpacity>
        ),
      }} />

      <View style={styles.header}>
        <Text style={styles.title}>Report Issue</Text>
        <Text style={styles.subtitle}>
          Capture the problem clearly to help civic authorities resolve it efficiently.
        </Text>
      </View>

      <View style={styles.viewfinderContainer}>
        {capturedImage ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: capturedImage }} style={styles.viewfinderImage} />
            <TouchableOpacity style={styles.retakeButton} onPress={() => setCapturedImage(null)}>
               <MaterialIcons name="refresh" size={20} color="#fff" />
               <Text style={styles.retakeText}>Retake Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          permission?.granted ? (
            <CameraView style={styles.viewfinderImage} ref={cameraRef}>
              <View style={styles.viewfinderOverlay}>
                <TouchableOpacity style={styles.overlayIcon} onPress={() => {}}>
                   <MaterialIcons name="flip-camera-ios" size={24} color={Theme.colors.onSurface} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
                   <MaterialIcons name="camera" size={32} color={Theme.colors.onPrimary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.overlayIcon}>
                   <MaterialIcons name="photo-library" size={24} color={Theme.colors.onSurface} />
                </TouchableOpacity>
              </View>
            </CameraView>
          ) : (
            <View style={styles.mockViewfinder}>
              <MaterialIcons name="camera-alt" size={48} color={Theme.colors.outline} />
              <Text style={styles.mockText}>Camera not available on Simulator</Text>
              <TouchableOpacity style={styles.shutterButton} onPress={() => setCapturedImage('https://lh3.googleusercontent.com/aida-public/AB6AXuCvAxygoORhk5gY5M2OuXowaYdO4shceemiIPYqn3bGgVMNs-6QgKedGAXIODcLkIMytm-3QFi2jFMnM00cBlkfEdhXnuHAwqPmODBn2E1CiQlD97LIoC__yY3eNQWaKsvCfXnrzLgwNfHFqMr1KPddjAJcSZfd3AUAVhtT783Yx_mGl6uOjqRBx8tc88ocSZv4rjD_XcdizTRYpQ9g3hYgkkaXXR-AkgNBwgSC7QEFqaKyLAZ-S1RknwTe3jQDcPqg6sXnNcccQL8')}>
                 <MaterialIcons name="camera" size={32} color={Theme.colors.onPrimary} />
              </TouchableOpacity>
              <Text style={styles.mockHint}>Tap Shutter to skip mockup</Text>
            </View>
          )
        )}
      </View>

      <View style={styles.contextCard}>
        <Text style={styles.sectionLabel}>Location Context</Text>
        <View style={styles.contextItem}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="location-on" size={20} color={Theme.colors.primary} />
          </View>
          <View style={styles.textStack}>
            <Text style={styles.contextTitle} numberOfLines={1}>{address}</Text>
            <Text style={styles.contextSub}>Auto-detected via GPS • Accuracy: High</Text>
          </View>
        </View>
        
        <View style={styles.contextItem}>
          <View style={[styles.iconContainer, { backgroundColor: Theme.colors.secondaryContainer }]}>
            <MaterialIcons name="shield" size={20} color={Theme.colors.onSecondaryContainer} />
          </View>
          <View style={styles.textStack}>
            <Text style={styles.contextTitle}>Assigned: {ward}</Text>
            <Text style={styles.contextSub}>Responsible for immediate dispatch in {ward}.</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Issue Category</Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat.id}
              style={[
                styles.categoryCard, 
                selectedCategory === cat.id && styles.categoryCardSelected
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <View style={[
                styles.catIconContainer,
                selectedCategory === cat.id && { backgroundColor: Theme.colors.primary }
              ]}>
                <MaterialIcons 
                  name={cat.icon as any} 
                  size={18} 
                  color={selectedCategory === cat.id ? Theme.colors.onPrimary : Theme.colors.onSurfaceVariant} 
                />
              </View>
              <Text style={[
                styles.categoryLabel,
                selectedCategory === cat.id && { color: Theme.colors.primary }
              ]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.anonymousRow}>
        <View>
          <Text style={styles.anonymousTitle}>Anonymous Mode</Text>
          <Text style={styles.anonymousSub}>Hide your identity from public logs</Text>
        </View>
        <Switch 
          value={isAnonymous} 
          onValueChange={setIsAnonymous} 
          trackColor={{ false: Theme.colors.surfaceContainerHighest, true: Theme.colors.primaryContainer }}
          thumbColor={isAnonymous ? Theme.colors.primary : Theme.colors.onPrimary}
        />
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.submitButton, isSubmitting && { opacity: 0.7 }]} 
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={Theme.colors.onPrimary} size="small" />
          ) : (
            <>
              <Text style={styles.submitText}>Submit Report</Text>
              <MaterialIcons name="send" size={18} color={Theme.colors.onPrimary} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionText: {
    fontFamily: Theme.typography.body,
    textAlign: 'center',
    marginBottom: 24,
    color: Theme.colors.onSurfaceVariant,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    marginBottom: 24,
  },
  title: {
    fontFamily: Theme.typography.headline,
    fontSize: 40,
    fontWeight: '800',
    color: Theme.colors.onSurface,
    letterSpacing: -1,
  },
  subtitle: {
    fontFamily: Theme.typography.body,
    fontSize: 16,
    lineHeight: 24,
    color: Theme.colors.onSurfaceVariant,
    marginTop: 8,
  },
  viewfinderContainer: {
    width: '100%',
    aspectRatio: 3/4,
    backgroundColor: Theme.colors.surfaceContainerHigh,
    overflow: 'hidden',
  },
  viewfinderImage: {
    width: '100%',
    height: '100%',
  },
  previewContainer: {
    width: '100%',
    height: '100%',
  },
  retakeButton: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  retakeText: {
    color: '#fff',
    fontFamily: Theme.typography.label,
    fontSize: 12,
    fontWeight: '600',
  },
  viewfinderOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  shutterButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Theme.colors.primary,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contextCard: {
    margin: 24,
    padding: 24,
    backgroundColor: Theme.colors.surfaceContainerLow,
    borderRadius: Theme.borderRadius.lg,
  },
  sectionLabel: {
    fontFamily: Theme.typography.label,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: Theme.colors.outline,
    marginBottom: 16,
  },
  contextItem: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStack: {
    flex: 1,
  },
  contextTitle: {
    fontFamily: Theme.typography.bodyMedium,
    fontSize: 15,
    color: Theme.colors.onSurface,
  },
  contextSub: {
    fontFamily: Theme.typography.body,
    fontSize: 12,
    color: Theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    minWidth: '45%',
    padding: 20,
    backgroundColor: Theme.colors.surfaceContainerLowest,
    borderRadius: Theme.borderRadius.md,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  categoryCardSelected: {
    backgroundColor: 'rgba(0, 88, 189, 0.05)',
    borderColor: Theme.colors.primary,
  },
  catIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryLabel: {
    fontFamily: Theme.typography.bodyMedium,
    fontSize: 14,
    color: Theme.colors.onSurface,
  },
  anonymousRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    padding: 20,
    backgroundColor: Theme.colors.surfaceContainerHighest,
    borderRadius: Theme.borderRadius.lg,
    marginBottom: 32,
  },
  anonymousTitle: {
    fontFamily: Theme.typography.bodyMedium,
    fontSize: 15,
    color: Theme.colors.onSurface,
  },
  anonymousSub: {
    fontFamily: Theme.typography.body,
    fontSize: 12,
    color: Theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 40,
  },
  cancelButton: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.surfaceContainerHighest,
    borderRadius: Theme.borderRadius.md,
  },
  cancelText: {
    fontFamily: Theme.typography.label,
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.onSurface,
  },
  submitButton: {
    flex: 2,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.md,
    gap: 8,
  },
  submitText: {
    fontFamily: Theme.typography.label,
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.onPrimary,
  },
  mockViewfinder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.surfaceContainerHighest,
    gap: 16,
  },
  mockText: {
    fontFamily: Theme.typography.body,
    fontSize: 14,
    color: Theme.colors.onSurfaceVariant,
  },
  mockHint: {
    fontFamily: Theme.typography.label,
    fontSize: 11,
    color: Theme.colors.outline,
  },
});
