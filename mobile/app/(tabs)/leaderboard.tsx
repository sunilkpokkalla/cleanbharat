import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/Theme';
import { TopAppBar } from '../../components/TopAppBar';

export default function LeaderboardScreen() {
  return (
    <View style={styles.container}>
      <TopAppBar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Ward Performance Index</Text>
          <Text style={styles.subtitle}>
            Monthly comparative ranking of administrative wards across India based on civic resolution rates.
          </Text>
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard title="National Resolution" value="82.4%" trend="+2.1%" trendColor={Theme.colors.secondary} />
          <MetricCard title="Total Reports" value="142,890" />
          <MetricCard title="Avg. Rating" value="4.2" suffix="/ 5.0" />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="verified" size={24} color={Theme.colors.secondary} />
            <Text style={styles.sectionTitle}>Top Performers</Text>
          </View>
          
          <LeaderboardItem rank={1} name="Ward 42, Indore" location="Madhya Pradesh" score="98.2%" type="success" />
          <LeaderboardItem rank={2} name="Ward 15, Surat" location="Gujarat" score="96.5%" type="default" />
          <LeaderboardItem rank={3} name="Ward 8, Navi Mumbai" location="Maharashtra" score="95.1%" type="default" />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="warning" size={24} color={Theme.colors.error} />
            <Text style={styles.sectionTitle}>Areas Needing Attention</Text>
          </View>
          
          <LeaderboardItem rank={412} name="Ward 89, Kanpur" location="Uttar Pradesh" score="42.1%" type="error" />
          <LeaderboardItem rank={411} name="Ward 12, Patna" location="Bihar" score="45.8%" type="error" />
        </View>
      </ScrollView>
    </View>
  );
}

const MetricCard = ({ title, value, trend, trendColor, suffix }: any) => (
  <View style={styles.metricCard}>
    <Text style={styles.metricTitle}>{title}</Text>
    <View style={styles.metricValueContainer}>
      <Text style={styles.metricValue}>{value}</Text>
      {suffix && <Text style={styles.metricSuffix}>{suffix}</Text>}
      {trend && (
        <View style={styles.trendContainer}>
          <MaterialIcons name="arrow-upward" size={12} color={trendColor} />
          <Text style={[styles.trendText, { color: trendColor }]}>{trend}</Text>
        </View>
      )}
    </View>
  </View>
);

const LeaderboardItem = ({ rank, name, location, score, type }: any) => {
  const getRankBg = () => {
    if (type === 'success') return Theme.colors.secondaryContainer;
    if (type === 'error') return Theme.colors.errorContainer;
    return Theme.colors.surfaceContainerHighest;
  };

  const getRankColor = () => {
    if (type === 'success') return Theme.colors.onSecondaryContainer;
    if (type === 'error') return Theme.colors.onErrorContainer;
    return Theme.colors.onSurface;
  };

  return (
    <View style={styles.leaderboardItem}>
      <View style={styles.rankInfo}>
        <View style={[styles.rankBadge, { backgroundColor: getRankBg() }]}>
          <Text style={[styles.rankText, { color: getRankColor() }]}>{rank}</Text>
        </View>
        <View>
          <Text style={styles.itemName}>{name}</Text>
          <Text style={styles.itemLocation}>{location}</Text>
        </View>
      </View>
      <View style={styles.scoreInfo}>
        <Text style={[styles.itemScore, { color: type === 'error' ? Theme.colors.error : Theme.colors.secondary }]}>
          {score}
        </Text>
        <Text style={styles.scoreLabel}>Resolution</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: Theme.typography.headline,
    fontSize: 32,
    fontWeight: '800',
    color: Theme.colors.onSurface,
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: Theme.typography.body,
    fontSize: 15,
    lineHeight: 22,
    color: Theme.colors.onSurfaceVariant,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Theme.colors.surfaceContainerLowest,
    padding: 20,
    borderRadius: Theme.borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  metricTitle: {
    fontFamily: Theme.typography.label,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: Theme.colors.onSurfaceVariant,
    marginBottom: 8,
  },
  metricValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  metricValue: {
    fontFamily: Theme.typography.headline,
    fontSize: 24,
    fontWeight: '700',
    color: Theme.colors.primary,
  },
  metricSuffix: {
    fontFamily: Theme.typography.body,
    fontSize: 12,
    color: Theme.colors.onSurfaceVariant,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  trendText: {
    fontFamily: Theme.typography.bodyMedium,
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: Theme.typography.headline,
    fontSize: 20,
    fontWeight: '700',
    color: Theme.colors.onSurface,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.colors.surfaceContainerLowest,
    padding: 16,
    borderRadius: Theme.borderRadius.md,
    marginBottom: 12,
  },
  rankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontFamily: Theme.typography.headline,
    fontSize: 14,
    fontWeight: '700',
  },
  itemName: {
    fontFamily: Theme.typography.headline,
    fontSize: 15,
    fontWeight: '600',
    color: Theme.colors.onSurface,
  },
  itemLocation: {
    fontFamily: Theme.typography.body,
    fontSize: 12,
    color: Theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  scoreInfo: {
    alignItems: 'flex-end',
  },
  itemScore: {
    fontFamily: Theme.typography.headline,
    fontSize: 18,
    fontWeight: '700',
  },
  scoreLabel: {
    fontFamily: Theme.typography.label,
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: Theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
});
