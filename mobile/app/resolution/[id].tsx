import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/Theme';
import { useReportStore } from '../../store/useReportStore';

export default function ResolutionDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const report = useReportStore((state) => state.reports.find(r => r.id === id));

  if (!report) return null;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: 'Issue Detail',
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color={Theme.colors.onPrimary} />
          </TouchableOpacity>
        ),
      }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: report.imageUrl }} style={styles.image} />
          <View style={styles.imageOverlay} />
        </View>

        <View style={styles.content}>
          <View style={styles.statusRow}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{report.status.replace('_', ' ')}</Text>
            </View>
            <Text style={styles.timestamp}>{report.timestamp}</Text>
          </View>

          <Text style={styles.title}>{report.title}</Text>
          
          <View style={styles.locationCard}>
             <MaterialIcons name="location-on" size={20} color={Theme.colors.primary} />
             <Text style={styles.locationText}>{report.ward}, {report.location}</Text>
          </View>

          <Text style={styles.description}>{report.description}</Text>

          {report.status === 'resolved' && (
            <View style={styles.resolutionCard}>
              <Text style={styles.sectionTitle}>Resolution Details</Text>
              <View style={styles.resolutionContainer}>
                <View style={styles.resolutionIcon}>
                  <MaterialIcons name="check-circle" size={24} color={Theme.colors.secondary} />
                </View>
                <View>
                  <Text style={styles.resolutionText}>Marked as resolved by Ward Officer</Text>
                  <Text style={styles.resolutionSub}>Verification photo uploaded on yesterday at 4:30 PM</Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.actionSection}>
             <Text style={styles.sectionTitle}>Engagement</Text>
             <View style={styles.statsRow}>
               <View style={styles.statItem}>
                  <Text style={styles.statValue}>{report.supportedCount}</Text>
                  <Text style={styles.statLabel}>Supporters</Text>
               </View>
               <View style={styles.statItem}>
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Comments</Text>
               </View>
             </View>
             
             <TouchableOpacity style={styles.supportButton}>
                <MaterialIcons name="thumb-up" size={20} color={Theme.colors.onPrimary} />
                <Text style={styles.supportButtonText}>Support this Report</Text>
             </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  imageContainer: {
    width: '100%',
    height: 350,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  content: {
    marginTop: -32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: Theme.colors.background,
    padding: 32,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    backgroundColor: Theme.colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontFamily: Theme.typography.label,
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '700',
    color: Theme.colors.primary,
  },
  timestamp: {
    fontFamily: Theme.typography.body,
    fontSize: 12,
    color: Theme.colors.onSurfaceVariant,
  },
  title: {
    fontFamily: Theme.typography.headline,
    fontSize: 28,
    fontWeight: '700',
    color: Theme.colors.onSurface,
    marginBottom: 16,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Theme.colors.surfaceContainerLow,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  locationText: {
    fontFamily: Theme.typography.bodyMedium,
    fontSize: 14,
    color: Theme.colors.onSurface,
  },
  description: {
    fontFamily: Theme.typography.body,
    fontSize: 16,
    lineHeight: 24,
    color: Theme.colors.onSurfaceVariant,
    marginBottom: 32,
  },
  resolutionCard: {
    padding: 24,
    backgroundColor: Theme.colors.secondaryContainer,
    borderRadius: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: Theme.typography.headline,
    fontSize: 18,
    fontWeight: '700',
    color: Theme.colors.onSurface,
    marginBottom: 16,
  },
  resolutionContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  resolutionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resolutionText: {
    fontFamily: Theme.typography.bodyMedium,
    fontSize: 15,
    color: Theme.colors.onSurface,
  },
  resolutionSub: {
    fontFamily: Theme.typography.body,
    fontSize: 12,
    color: Theme.colors.onSurfaceVariant,
    marginTop: 4,
  },
  actionSection: {
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.surfaceContainerHigh,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'flex-start',
  },
  statValue: {
    fontFamily: Theme.typography.headline,
    fontSize: 24,
    fontWeight: '700',
    color: Theme.colors.onSurface,
  },
  statLabel: {
    fontFamily: Theme.typography.body,
    fontSize: 12,
    color: Theme.colors.onSurfaceVariant,
  },
  supportButton: {
    height: 56,
    backgroundColor: Theme.colors.primary,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  supportButtonText: {
    fontFamily: Theme.typography.label,
    fontSize: 15,
    fontWeight: '700',
    color: Theme.colors.onPrimary,
  },
});
