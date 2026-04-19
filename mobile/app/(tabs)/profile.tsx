import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/Theme';
import { TopAppBar } from '../../components/TopAppBar';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <TopAppBar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU9Pv6HMf73hBf8pXSNNRlcTzE97n5Gqj57XHLlAynKp95_S-rr7xRwEGt3bm2UfU8EYVs8w0BwpHZUC5z-2LpjRFUdrBTj9DD90Pl00kcgiYeFnhjpatrYUr5IVw7MM6ightNxMDC3Jm7KF8Q-gllhnxcSCIvQLZKzTaByeGo9wgT9vxcC3e1C9QiyIrWiEVi1JpZlqEH3FAGZvRYf2AKeDzsYHTl1UHyz5Ukm_B80WWk4BJEj06LdUO32kvgONGqWttkEQzZAqU' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Sunil Kumar</Text>
          <Text style={styles.bio}>Active Civic Reporter • Sector 4</Text>
          
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <MaterialIcons name="stars" size={16} color="#B8860B" />
              <Text style={styles.badgeText}>Top 5% Reporter</Text>
            </View>
            <View style={styles.badge}>
              <MaterialIcons name="verified" size={16} color={Theme.colors.secondary} />
              <Text style={styles.badgeText}>Verified Resident</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Reports</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>9</Text>
            <Text style={styles.statLabel}>Resolved</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>248</Text>
            <Text style={styles.statLabel}>Karma</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <MenuItem icon="person_edit" label="Edit Profile" />
          <MenuItem icon="notifications_active" label="Notification Preferences" />
          <MenuItem icon="map" label="My Wards" />
          <MenuItem icon="shield" label="Privacy & Anonymity" />
          <MenuItem icon="help" label="Help & Support" />
        </View>
      </ScrollView>
    </View>
  );
}

const MenuItem = ({ icon, label }: any) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuItemLeft}>
      <View style={styles.iconCircle}>
        <MaterialIcons name={icon as any} size={20} color={Theme.colors.onSurfaceVariant} />
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <MaterialIcons name="chevron-right" size={20} color={Theme.colors.outline} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: Theme.colors.surfaceContainerLow,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Theme.colors.surfaceContainerLowest,
    marginBottom: 16,
  },
  name: {
    fontFamily: Theme.typography.headline,
    fontSize: 24,
    fontWeight: '700',
    color: Theme.colors.onSurface,
  },
  bio: {
    fontFamily: Theme.typography.body,
    fontSize: 14,
    color: Theme.colors.onSurfaceVariant,
    marginTop: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Theme.colors.surfaceContainerLowest,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  badgeText: {
    fontFamily: Theme.typography.label,
    fontSize: 10,
    fontWeight: '600',
    color: Theme.colors.onSurface,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: -24,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: Theme.colors.surfaceContainerLowest,
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  statNumber: {
    fontFamily: Theme.typography.headline,
    fontSize: 20,
    fontWeight: '700',
    color: Theme.colors.primary,
  },
  statLabel: {
    fontFamily: Theme.typography.label,
    fontSize: 10,
    textTransform: 'uppercase',
    color: Theme.colors.onSurfaceVariant,
    marginTop: 4,
  },
  menuContainer: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  sectionTitle: {
    fontFamily: Theme.typography.headline,
    fontSize: 18,
    fontWeight: '700',
    color: Theme.colors.onSurface,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.surfaceContainerLow,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontFamily: Theme.typography.bodyMedium,
    fontSize: 15,
    color: Theme.colors.onSurface,
  },
});
