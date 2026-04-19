import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Logo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.stripeContainer}>
        <View style={[styles.stripe, { backgroundColor: '#FF9933' }]} />
        <View style={[styles.stripe, { backgroundColor: '#FFFFFF' }]}>
           <View style={styles.chakra} />
        </View>
        <View style={[styles.stripe, { backgroundColor: '#128807' }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 16,
    borderRadius: 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  stripeContainer: {
    flex: 1,
  },
  stripe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chakra: {
    width: 4,
    height: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#000080',
  },
});
