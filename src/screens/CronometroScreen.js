import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Play, Pause, RotateCcw, ChevronLeft, Brain } from 'lucide-react-native';

export default function CronometroScreen({ navigation }) {
  const [seconds, setSeconds] = useState(1500);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) interval = setInterval(() => setSeconds(s => s - 1), 1000);
    else if (seconds === 0) setIsActive(false);
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('Home')}>
        <ChevronLeft color="#FFF" size={28} />
      </TouchableOpacity>
      
      <View style={styles.timerCircle}>
        <Brain size={40} color="rgba(255,255,255,0.4)" style={{ marginBottom: 10 }} />
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        <Text style={styles.modeLabel}>MODO FOCO ATIVO</Text>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity style={styles.resetBtn} onPress={() => {setSeconds(1500); setIsActive(false);}}>
          <RotateCcw color="#FFF" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playBtn} onPress={() => setIsActive(!isActive)}>
          {isActive ? <Pause color="#6C5CE7" size={32} fill="#6C5CE7" /> : <Play color="#6C5CE7" size={32} fill="#6C5CE7" />}
        </TouchableOpacity>

        <View style={{ width: 50 }} /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center' },
  back: { position: 'absolute', top: 60, left: 20, backgroundColor: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 15 },
  timerCircle: { width: 300, height: 300, borderRadius: 150, borderWidth: 2, borderColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)' },
  timerText: { fontSize: 80, color: '#FFF', fontWeight: '200', letterSpacing: -2 },
  modeLabel: { color: '#6C5CE7', fontWeight: '800', letterSpacing: 2, fontSize: 10, marginTop: 10 },
  controls: { flexDirection: 'row', alignItems: 'center', marginTop: 60, gap: 40 },
  playBtn: { backgroundColor: '#FFF', width: 90, height: 90, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 15 },
  resetBtn: { backgroundColor: 'rgba(255,255,255,0.1)', width: 55, height: 55, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }
});