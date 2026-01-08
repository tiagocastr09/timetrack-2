import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Clock } from 'lucide-react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Clock size={80} color="#fff" />
      </View>
      <Text style={styles.title}>TimeTrack</Text>
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#6C5CE7', justifyContent: 'center', alignItems: 'center' },
  logoCircle: { padding: 20, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginTop: 10 }
});