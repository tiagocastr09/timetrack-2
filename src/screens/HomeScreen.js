import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, StatusBar } from 'react-native';
import { Calendar, CheckCircle, BookOpen, Target, Search, Bell, Plus } from 'lucide-react-native';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Revisão: Termodinâmica', done: false, time: '08:00' },
    { id: 2, title: 'Matemática: Funções', done: true, time: '10:30' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const completedCount = tasks.filter(t => t.done).length;
  const progressPercent = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  // FUNÇÃO PARA ADICIONAR NOVA TAREFA
  const addTask = () => {
    if (newTaskTitle.trim() === '') return;
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      done: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setModalVisible(false);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.searchContainer}><Search size={18} color="#A292FF" /><TextInput placeholder="Buscar..." style={styles.inputSearch} /></View>
        <TouchableOpacity style={styles.iconButton}><Bell size={22} color="#6C5CE7" /></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.mainCard}>
           <View style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.greeting}>Olá, User! 👋</Text>
                <Text style={styles.cardSub}>{Math.round(progressPercent)}% concluído hoje</Text>
                <View style={styles.progressContainer}><View style={[styles.progressBar, { width: `${progressPercent}%` }]} /></View>
              </View>
              <View style={styles.avatarGlow} />
           </View>
        </View>

        <View style={styles.grid}>
          <MenuBox label="Agenda" icon={<Calendar color="#6C5CE7"/>} onPress={() => navigation.navigate('Calendario')} />
          <MenuBox label="Estudos" icon={<BookOpen color="#6C5CE7"/>} onPress={() => navigation.navigate('Estudos')} />
          <MenuBox label="Foco" icon={<CheckCircle color="#6C5CE7"/>} onPress={() => navigation.navigate('Cronometro')} />
          <MenuBox label="Metas" icon={<Target color="#6C5CE7"/>} onPress={() => navigation.navigate('Metas')} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tarefas de Hoje</Text>
          {tasks.map(task => (
            <TouchableOpacity key={task.id} style={styles.taskCard} onPress={() => toggleTask(task.id)}>
              <View style={[styles.indicator, { backgroundColor: task.done ? '#6C5CE7' : '#E0E0E0' }]} />
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={[styles.taskText, task.done && styles.taskDone]}>{task.title}</Text>
                <Text style={styles.taskTime}>{task.time}</Text>
              </View>
              <View style={[styles.customCheck, task.done && styles.customCheckActive]}>{task.done && <Text style={{ color: '#fff', fontSize: 10 }}>✓</Text>}</View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* BOTÃO ADICIONAR FUNCIONAL */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
        <Plus color="#fff" size={30} />
      </TouchableOpacity>

      {/* MODAL PARA NOVA TAREFA */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Nova Tarefa</Text>
            <TextInput placeholder="O que você precisa fazer?" style={styles.modalInput} value={newTaskTitle} onChangeText={setNewTaskTitle} autoFocus />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}><Text>Cancelar</Text></TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={addTask}><Text style={{color:'#fff', fontWeight:'bold'}}>Adicionar</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const MenuBox = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuBox} onPress={onPress}>
    <View style={styles.iconCircle}>{icon}</View>
    <Text style={styles.menuText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F8' },
  header: { flexDirection: 'row', paddingHorizontal: 20, paddingTop: 60, alignItems: 'center', gap: 15 },
  searchContainer: { flex: 1, flexDirection: 'row', backgroundColor: '#FFF', padding: 12, borderRadius: 20, alignItems: 'center', elevation: 3 },
  inputSearch: { marginLeft: 10, flex: 1, color: '#6C5CE7' },
  iconButton: { backgroundColor: '#FFF', padding: 12, borderRadius: 18, elevation: 3 },
  mainCard: { margin: 20, backgroundColor: '#6C5CE7', borderRadius: 30, padding: 25, elevation: 8 },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { color: '#FFF', fontSize: 24, fontWeight: '800' },
  cardSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 5 },
  progressContainer: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, marginTop: 15, width: '80%' },
  progressBar: { height: 8, backgroundColor: '#FFF', borderRadius: 4 },
  avatarGlow: { width: 50, height: 50, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.3)', borderWidth: 1, borderColor: '#FFF' },
  grid: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  menuBox: { width: '22%', alignItems: 'center' },
  iconCircle: { backgroundColor: '#FFF', padding: 15, borderRadius: 22, marginBottom: 8, elevation: 2 },
  menuText: { fontSize: 11, fontWeight: '700', color: '#555' },
  section: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1A1A1A', marginBottom: 15 },
  taskCard: { flexDirection: 'row', backgroundColor: '#FFF', padding: 20, borderRadius: 25, alignItems: 'center', marginBottom: 12, elevation: 2 },
  indicator: { width: 4, height: 40, borderRadius: 2 },
  taskText: { fontSize: 16, fontWeight: '600', color: '#333' },
  taskDone: { textDecorationLine: 'line-through', color: '#BBB' },
  taskTime: { fontSize: 12, color: '#999', marginTop: 3 },
  customCheck: { width: 22, height: 22, borderRadius: 7, borderWidth: 2, borderColor: '#6C5CE7', justifyContent: 'center', alignItems: 'center' },
  customCheckActive: { backgroundColor: '#6C5CE7' },
  floatingButton: { position: 'absolute', bottom: 30, right: 30, width: 65, height: 65, borderRadius: 25, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center', elevation: 10 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalBox: { backgroundColor: '#FFF', padding: 30, borderRadius: 25 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  modalInput: { backgroundColor: '#F0F2F8', padding: 15, borderRadius: 15, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15 },
  cancelBtn: { padding: 10 },
  saveBtn: { backgroundColor: '#6C5CE7', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 }
});