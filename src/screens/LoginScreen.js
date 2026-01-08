import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { GraduationCap, Facebook, Mail } from 'lucide-react-native';

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoArea}>
          <View style={styles.iconCircle}>
            <GraduationCap size={50} color="#FFF" />
          </View>
          <Text style={styles.brandName}>TimeTrack</Text>
          <Text style={styles.brandTagline}>Organize seu tempo, conquiste o mundo.</Text>
        </View>

        <View style={styles.form}>
          <TextInput placeholder="E-mail" style={styles.input} placeholderTextColor="#AAA" />
          <TextInput placeholder="Senha" style={styles.input} secureTextEntry placeholderTextColor="#AAA" />
          
          <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.loginText}>Acessar Conta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Ou entre com</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialIcon}><Facebook color="#1877F2" fill="#1877F2" size={20}/></TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}><Mail color="#DB4437" size={20}/></TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { flex: 1, padding: 40, justifyContent: 'center' },
  logoArea: { alignItems: 'center', marginBottom: 50 },
  iconCircle: { backgroundColor: '#6C5CE7', padding: 20, borderRadius: 25, elevation: 10 },
  brandName: { fontSize: 28, fontWeight: '800', color: '#1A1A1A', marginTop: 15 },
  brandTagline: { fontSize: 12, color: '#999', marginTop: 5 },
  form: { gap: 15 },
  input: { backgroundColor: '#F8F9FE', padding: 18, borderRadius: 18, fontSize: 15, color: '#333', borderWidth: 1, borderColor: '#EEE' },
  loginBtn: { backgroundColor: '#1A1A1A', padding: 20, borderRadius: 18, alignItems: 'center', marginTop: 10, elevation: 5 },
  loginText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  footer: { marginTop: 40, alignItems: 'center' },
  footerText: { color: '#BBB', fontSize: 12, marginBottom: 20, fontWeight: '600' },
  socialRow: { flexDirection: 'row', gap: 20 },
  socialIcon: { padding: 15, borderRadius: 15, borderWeight: 1, borderColor: '#EEE', backgroundColor: '#FFF', elevation: 2 }
});