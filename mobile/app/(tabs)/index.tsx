import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/Theme';
import { TopAppBar } from '../../components/TopAppBar';
import { ReportCard } from '../../components/ReportCard';
import { useReportStore } from '../../store/useReportStore';

export default function HomeScreen() {
  const router = useRouter();
  const reports = useReportStore((state) => state.reports);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <TopAppBar />
      
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.title}>Live Reports</Text>
            <Text style={styles.subtitle}>
              A real-time curation of civic issues reported across the city. Transparency in action.
            </Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.filterContainer}
            >
              <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
                <MaterialIcons name="filter-list" size={18} color={Theme.colors.onPrimary} />
                <Text style={[styles.filterText, styles.filterTextActive]}>All Wards</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.filterButton}>
                <View style={[styles.filterDot, { backgroundColor: Theme.colors.error }]} />
                <Text style={styles.filterText}>Needs Attention</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.filterButton}>
                <View style={[styles.filterDot, { backgroundColor: Theme.colors.secondary }]} />
                <Text style={styles.filterText}>Resolved</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
        renderItem={({ item }) => (
          <ReportCard 
            report={item} 
            onPress={() => router.push(`/resolution/${item.id}`)} 
          />
        )}
        ListFooterComponent={() => (
          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Load More Issues</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/report')}
      >
        <MaterialIcons name="add" size={30} color={Theme.colors.onPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    marginTop: 32,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  title: {
    fontFamily: Theme.typography.headline,
    fontSize: 36,
    fontWeight: '800',
    color: Theme.colors.onSurface,
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: Theme.typography.body,
    fontSize: 16,
    lineHeight: 24,
    color: Theme.colors.onSurfaceVariant,
    marginBottom: 24,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surfaceContainerLowest,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Theme.borderRadius.full,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  filterButtonActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  filterDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  filterText: {
    fontFamily: Theme.typography.label,
    fontSize: 13,
    color: Theme.colors.onSurface,
  },
  filterTextActive: {
    color: Theme.colors.onPrimary,
  },
  loadMoreButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  loadMoreText: {
    fontFamily: Theme.typography.label,
    fontSize: 12,
    fontWeight: '700',
    color: Theme.colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
});
