import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, StatusBar } from 'react-native';
import { ChevronLeft, Play, Plus, CheckSquare, Square, Book, BarChart3, GraduationCap } from 'lucide-react-native';

export default function EstudosScreen({ navigation }) {
  const [filtro, setFiltro] = useState('Todos');
  const [modalVisible, setModalVisible] = useState(false);
  const [novaMateriaNome, setNovaMateriaNome] = useState('');
  
  // Estado das sessões (Agora com lógica de cálculo de progresso)
  const [sessoes, setSessoes] = useState([
    { 
      id: 1, 
      materia: 'Física', 
      tema: 'Termodinâmica', 
      tarefas: [
        { id: 101, texto: 'Resolver questões', feita: false },
        { id: 102, texto: 'Revisar conteúdo', feita: false }
      ] 
    },
    { 
      id: 2, 
      materia: 'Matemática', 
      tema: 'Funções', 
      tarefas: [
        { id: 201, texto: 'Atividade Livro', feita: true },
        { id: 202, texto: 'Exercícios Extras', feita: false }
      ] 
    }
  ]);

  // FUNÇÃO: Alternar tarefa e atualizar progresso automaticamente
  const toggleSubTarefa = (sessaoId, tarefaId) => {
    setSessoes(sessoes.map(s => {
      if (s.id === sessaoId) {
        const novasTarefas = s.tarefas.map(t => t.id === tarefaId ? { ...t, feita: !t.feita } : t);
        return { ...s, tarefas: novasTarefas };
      }
      return s;
    }));
  };

  // FUNÇÃO: Adicionar nova matéria (Sessão)
  const addSessao = () => {
    if (novaMateriaNome.trim() === '') return;
    const novaSessao = {
      id: Math.random(),
      materia: 'Geral',
      tema: novaMateriaNome,
      tarefas: [{ id: Math.random(), texto: 'Iniciar estudos', feita: false }]
    };
    setSessoes([...sessoes, novaSessao]);
    setNovaMateriaNome('');
    setModalVisible(false);
  };

  // CÁLCULOS PARA AS ESTATÍSTICAS DO TOPO
  const totalTarefas = sessoes.reduce((acc, s) => acc + s.tarefas.length, 0);
  const totalConcluidas = sessoes.reduce((acc, s) => acc + s.tarefas.filter(t => t.feita).length, 0);
  const focoMedio = totalTarefas > 0 ? Math.round((totalConcluidas / totalTarefas) * 100) : 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
          <ChevronLeft color="#333" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Área de Estudos</Text>
        <View style={styles.avatarMini} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* ESTATÍSTICAS REAIS (Agora funcionam!) */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Book size={20} color="#6C5CE7" />
            <Text style={styles.statNumber}>{totalTarefas}</Text>
            <Text style={styles.statLabel}>Metas</Text>
          </View>
          <View style={styles.statCard}>
            <BarChart3 size={20} color="#6C5CE7" />
            <Text style={styles.statNumber}>{focoMedio}%</Text>
            <Text style={styles.statLabel}>Progresso</Text>
          </View>
          <View style={styles.statCard}>
            <GraduationCap size={20} color="#6C5CE7" />
            <Text style={styles.statNumber}>{sessoes.length}</Text>
            <Text style={styles.statLabel}>Matérias</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Filtrar Matéria</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {['Todos', 'Matemática', 'Física', 'Química', 'Geral'].map(item => (
            <TouchableOpacity 
              key={item} 
              style={[styles.tag, filtro === item && styles.tagActive]} 
              onPress={() => setFiltro(item)}
            >
              <Text style={[styles.tagText, filtro === item && styles.tagTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sessionSection}>
          <Text style={styles.sectionTitle}>Suas Sessões</Text>
          {sessoes.filter(s => filtro === 'Todos' || s.materia === filtro).map(sessao => {
            // Cálculo de progresso individual por card
            const conclusasSessao = sessao.tarefas.filter(t => t.feita).length;
            const porcentagemSessao = Math.round((conclusasSessao / sessao.tarefas.length) * 100);

            return (
              <View key={sessao.id} style={styles.sessaoCard}>
                <View style={styles.sessaoHeader}>
                  <TouchableOpacity style={styles.playIcon} onPress={() => navigation.navigate('Cronometro')}>
                    <Play color="#fff" size={18} fill="#fff" />
                  </TouchableOpacity>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.materiaBadge}>{sessao.materia}</Text>
                    <Text style={styles.sessaoTitle}>{sessao.tema}</Text>
                  </View>
                  <View style={[styles.progressCircle, {borderColor: porcentagemSessao === 100 ? '#4CAF50' : '#6C5CE7'}]}>
                     <Text style={styles.progressText}>{porcentagemSessao}%</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                {sessao.tarefas.map(tarefa => (
                  <TouchableOpacity 
                    key={tarefa.id} 
                    style={styles.subTarefaRow} 
                    onPress={() => toggleSubTarefa(sessao.id, tarefa.id)}
                  >
                    <View style={[styles.checkUi, tarefa.feita && styles.checkUiActive]}>
                      {tarefa.feita && <Text style={{color: '#fff', fontSize: 10}}>✓</Text>}
                    </View>
                    <Text style={[styles.subTarefaText, tarefa.feita && styles.textDone]}>{tarefa.texto}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Plus color="#fff" size={28} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Novo Objetivo de Estudo</Text>
            <TextInput 
              placeholder="Ex: Revisar Revolução Industrial" 
              style={styles.modalInput} 
              value={novaMateriaNome} 
              onChangeText={setNovaMateriaNome} 
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                <Text style={{color: '#999'}}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={addSessao}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>Criar Sessão</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FE', paddingTop: 60, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backBtn: { backgroundColor: '#FFF', padding: 10, borderRadius: 15, elevation: 3 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1A1A1A' },
  avatarMini: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#6C5CE7' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  statCard: { backgroundColor: '#FFF', width: '31%', padding: 15, borderRadius: 20, alignItems: 'center', elevation: 2 },
  statNumber: { fontSize: 16, fontWeight: '800', color: '#1A1A1A', marginTop: 5 },
  statLabel: { fontSize: 10, color: '#999', fontWeight: '600' },
  sectionLabel: { fontSize: 12, fontWeight: '800', color: '#6C5CE7', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  filterRow: { flexDirection: 'row', marginBottom: 30 },
  tag: { paddingVertical: 12, paddingHorizontal: 22, borderRadius: 18, backgroundColor: '#FFF', marginRight: 10, elevation: 2 },
  tagActive: { backgroundColor: '#6C5CE7' },
  tagText: { color: '#666', fontWeight: '700', fontSize: 14 },
  tagTextActive: { color: '#FFF' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', marginBottom: 20 },
  sessaoCard: { backgroundColor: '#FFF', borderRadius: 30, padding: 20, marginBottom: 20, elevation: 4 },
  sessaoHeader: { flexDirection: 'row', alignItems: 'center' },
  playIcon: { backgroundColor: '#6C5CE7', padding: 14, borderRadius: 18, marginRight: 15 },
  materiaBadge: { fontSize: 10, fontWeight: '800', color: '#6C5CE7', textTransform: 'uppercase' },
  sessaoTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  progressCircle: { width: 42, height: 42, borderRadius: 21, borderWidth: 3, borderColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
  progressText: { fontSize: 10, fontWeight: 'bold', color: '#6C5CE7' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },
  subTarefaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  checkUi: { width: 20, height: 20, borderRadius: 6, borderWidth: 2, borderColor: '#6C5CE7', justifyContent: 'center', alignItems: 'center' },
  checkUiActive: { backgroundColor: '#6C5CE7' },
  subTarefaText: { marginLeft: 12, color: '#555', fontSize: 14, fontWeight: '500' },
  textDone: { textDecorationLine: 'line-through', color: '#BBB' },
  fab: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#1A1A1A', width: 65, height: 65, borderRadius: 22, justifyContent: 'center', alignItems: 'center', elevation: 8 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 25 },
  modalBox: { backgroundColor: '#FFF', padding: 30, borderRadius: 30 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  modalInput: { backgroundColor: '#F8F9FE', padding: 18, borderRadius: 15, marginBottom: 25, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20, alignItems: 'center' },
  saveBtn: { backgroundColor: '#6C5CE7', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 15 }
});