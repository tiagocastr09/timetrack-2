import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, StatusBar, Dimensions } from 'react-native';
import { ChevronLeft, Plus, Target, Trash2, CheckCircle, Award, Star, Flame, Trophy } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Certifique-se de ter instalado: npx expo install expo-linear-gradient

const { width } = Dimensions.get('window');

export default function MetasScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [novaMeta, setNovaMeta] = useState('');
  const [metas, setMetas] = useState([
    { id: '1', title: 'Dominar React Native', done: false, icon: <Star size={20} color="#FFD700" /> },
    { id: '2', title: 'Concluir Projeto de UI/UX', done: true, icon: <Trophy size={20} color="#FFD700" /> },
  ]);

  const adicionarMeta = () => {
    if (novaMeta.trim() === '') return;
    const item = { 
        id: Math.random().toString(), 
        title: novaMeta, 
        done: false,
        icon: <Flame size={20} color="#FF7675" /> 
    };
    setMetas([...metas, item]);
    setNovaMeta('');
    setModalVisible(false);
  };

  const toggleMeta = (id) => {
    setMetas(metas.map(m => m.id === id ? { ...m, done: !m.done } : m));
  };

  const eliminarMeta = (id) => {
    setMetas(metas.filter(m => m.id !== id));
  };

  const total = metas.length;
  const concluidas = metas.filter(m => m.done).length;
  const progresso = total > 0 ? Math.round((concluidas / total) * 100) : 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header com Gradiente Moderno */}
      <LinearGradient colors={['#6C5CE7', '#8E44AD']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Metas</Text>
          <View style={styles.avatarMini} />
        </View>

        <View style={styles.headerStats}>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{total}</Text>
                <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{concluidas}</Text>
                <Text style={styles.statLabel}>Feitas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{progresso}%</Text>
                <Text style={styles.statLabel}>Foco</Text>
            </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        
        {/* Card de Progresso Circular Visual */}
        <View style={styles.progressCard}>
          <View style={{flex: 1}}>
            <Text style={styles.progressTextTitle}>Quase lá!</Text>
            <Text style={styles.progressTextSub}>Continue assim para bater sua meta semanal.</Text>
          </View>
          <View style={styles.progressCircle}>
            <Text style={styles.progressCircleText}>{progresso}%</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Objetivos Ativos</Text>
            <Award size={18} color="#6C5CE7" />
        </View>

        {metas.length === 0 ? (
          <View style={styles.emptyBox}>
            <Target size={50} color="#DDD" />
            <Text style={styles.emptyText}>Que tal definir um novo objetivo?</Text>
          </View>
        ) : (
          metas.map(item => (
            <TouchableOpacity 
                key={item.id} 
                style={[styles.metaCard, item.done && styles.metaCardDone]}
                onPress={() => toggleMeta(item.id)}
                activeOpacity={0.8}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.done ? '#E0E0E0' : '#F0EEFF' }]}>
                {item.icon}
              </View>
              
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={[styles.metaLabel, item.done && styles.metaDoneText]}>
                  {item.title}
                </Text>
                <Text style={styles.metaStatus}>{item.done ? 'Concluído' : 'Em progresso'}</Text>
              </View>

              <TouchableOpacity onPress={() => eliminarMeta(item.id)} style={styles.deleteBtn}>
                <Trash2 size={18} color={item.done ? "#CCC" : "#FF7675"} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Botão de Adicionar Flutuante */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Plus color="#FFF" size={30} />
      </TouchableOpacity>

      {/* Modal Estilizado */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderIndicator} />
            <Text style={styles.modalTitle}>Nova Meta</Text>
            <TextInput 
              placeholder="Ex: Ler 10 páginas de React" 
              style={styles.input} 
              value={novaMeta}
              onChangeText={setNovaMeta}
              placeholderTextColor="#AAA"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#999', fontWeight: 'bold' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={adicionarMeta}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { 
    height: 220, 
    paddingTop: 50, 
    paddingHorizontal: 25,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 10
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backBtn: { backgroundColor: 'rgba(255,255,255,0.25)', padding: 10, borderRadius: 15 },
  headerTitle: { color: '#FFF', fontSize: 22, fontWeight: '800' },
  avatarMini: { width: 40, height: 40, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.3)', borderWidth: 1, borderColor: '#FFF' },
  
  headerStats: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, alignItems: 'center' },
  statItem: { alignItems: 'center' },
  statValue: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600' },
  statDivider: { width: 1, height: 25, backgroundColor: 'rgba(255,255,255,0.3)' },

  progressCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 25, 
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: -40,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  progressTextTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A' },
  progressTextSub: { fontSize: 12, color: '#999', marginTop: 3 },
  progressCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#F0EEFF', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#6C5CE7' },
  progressCircleText: { color: '#6C5CE7', fontWeight: 'bold', fontSize: 14 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#333' },

  metaCard: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    padding: 18, 
    borderRadius: 25, 
    alignItems: 'center', 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  metaCardDone: { opacity: 0.7, backgroundColor: '#FAFAFA' },
  iconContainer: { width: 45, height: 45, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  metaLabel: { fontSize: 16, fontWeight: '700', color: '#2D3436' },
  metaDoneText: { textDecorationLine: 'line-through', color: '#B2BEC3' },
  metaStatus: { fontSize: 11, color: '#999', marginTop: 2 },
  
  fab: { 
    position: 'absolute', 
    bottom: 30, 
    right: 25, 
    backgroundColor: '#1A1A1A', 
    width: 65, 
    height: 65, 
    borderRadius: 22, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 8 
  },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 30, paddingBottom: 50 },
  modalHeaderIndicator: { width: 50, height: 5, backgroundColor: '#EEE', borderRadius: 10, alignSelf: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 20 },
  input: { backgroundColor: '#F5F6FA', padding: 20, borderRadius: 20, fontSize: 16, color: '#333' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, alignItems: 'center' },
  saveBtn: { backgroundColor: '#6C5CE7', paddingVertical: 15, paddingHorizontal: 35, borderRadius: 18 },
  emptyBox: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: '#CCC', marginTop: 15, fontSize: 15 }
});