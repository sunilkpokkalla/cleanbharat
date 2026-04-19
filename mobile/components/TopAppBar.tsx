import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '../constants/Theme';
import { Logo } from './Logo';

export const TopAppBar = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
          <Text style={styles.logoText}>CleanBharat</Text>
        </View>
        
        <TouchableOpacity style={styles.profileButton}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU9Pv6HMf73hBf8pXSNNRlcTzE97n5Gqj57XHLlAynKp95_S-rr7xRwEGt3bm2UfU8EYVs8w0BwpHZUC5z-2LpjRFUdrBTj9DD90Pl00kcgiYeFnhjpatrYUr5IVw7MM6ightNxMDC3Jm7KF8Q-gllhnxcSCIvQLZKzTaByeGo9wgT9vxcC3e1C9QiyIrWiEVi1JpZlqEH3FAGZvRYf2AKeDzsYHTl1UHyz5Ukm_B80WWk4BJEj06LdUO32kvgONGqWttkEQzZAqU' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Theme.colors.surface,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.surfaceContainerLow,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontFamily: Theme.typography.headline,
    fontSize: 20,
    fontWeight: '800',
    color: Theme.colors.primary,
    letterSpacing: -0.5,
  },
  profileButton: {
    shadowColor: Theme.colors.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Theme.colors.surfaceContainerLowest,
  },
});
