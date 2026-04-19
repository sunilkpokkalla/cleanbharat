import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '../constants/Theme';
import { Report } from '../store/useReportStore';

interface ReportCardProps {
  report: Report;
  onPress: () => void;
}

export const ReportCard = ({ report, onPress }: ReportCardProps) => {
  const getStatusConfig = (status: Report['status']) => {
    switch (status) {
      case 'reported':
        return { label: 'Reported', color: Theme.colors.error, bg: Theme.colors.errorContainer, onBg: Theme.colors.error, icon: 'report' };
      case 'in_progress':
        return { label: 'In Progress', color: Theme.colors.primary, bg: Theme.colors.primaryContainer, onBg: Theme.colors.onPrimaryContainer, icon: 'pending' };
      case 'resolved':
        return { label: 'Resolved', color: Theme.colors.secondary, bg: Theme.colors.secondaryContainer, onBg: Theme.colors.onSecondaryContainer, icon: 'check-circle' };
      default:
        return { label: 'Unknown', color: Theme.colors.outline, bg: Theme.colors.surfaceContainerHigh, onBg: Theme.colors.onSurfaceVariant, icon: 'info' };
    }
  };

  const config = getStatusConfig(report.status);

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: report.imageUrl }} style={styles.image} />
        <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
          <MaterialIcons name={config.icon as any} size={14} color={config.onBg} />
          <Text style={[styles.statusText, { color: config.onBg }]}>{config.label}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleArea}>
            <Text style={styles.title}>{report.title}</Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color={Theme.colors.primary} />
              <Text style={styles.locationText}>{report.ward}, {report.location}</Text>
            </View>
          </View>
          <Text style={styles.timestamp}>{report.timestamp}</Text>
        </View>

        <Text numberOfLines={2} style={styles.description}>{report.description}</Text>

        <View style={styles.footer}>
          <View style={styles.supportersContainer}>
            <View style={styles.avatarStack}>
              <View style={[styles.miniAvatar, { backgroundColor: Theme.colors.surfaceContainerHighest }]} />
              <View style={[styles.miniAvatar, { backgroundColor: Theme.colors.surfaceContainerHigh, marginLeft: -8 }]} />
            </View>
            <Text style={styles.supportersText}>+{report.supportedCount} Supported</Text>
          </View>
          
          <View style={styles.actionContainer}>
            <Text style={styles.actionText}>View Details</Text>
            <MaterialIcons name="arrow-forward" size={16} color={Theme.colors.primary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.surfaceContainerLowest,
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: Theme.colors.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Theme.borderRadius.full,
    gap: 4,
  },
  statusText: {
    fontFamily: Theme.typography.label,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  content: {
    padding: 24,
    backgroundColor: Theme.colors.surfaceContainerLow,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleArea: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontFamily: Theme.typography.headline,
    fontSize: 18,
    fontWeight: '600',
    color: Theme.colors.onSurface,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontFamily: Theme.typography.bodyMedium,
    fontSize: 13,
    color: Theme.colors.onSurfaceVariant,
  },
  timestamp: {
    fontFamily: Theme.typography.body,
    fontSize: 11,
    color: Theme.colors.onSurfaceVariant,
    backgroundColor: Theme.colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  description: {
    fontFamily: Theme.typography.body,
    fontSize: 14,
    lineHeight: 20,
    color: Theme.colors.onSurfaceVariant,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  supportersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarStack: {
    flexDirection: 'row',
  },
  miniAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Theme.colors.surfaceContainerLow,
  },
  supportersText: {
    fontFamily: Theme.typography.bodyMedium,
    fontSize: 12,
    color: Theme.colors.onSurfaceVariant,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontFamily: Theme.typography.label,
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
});
