import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, StatusBar } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ChevronLeft, Plus, Clock, Calendar as CalendarIcon, Trash2 } from 'lucide-react-native';

// Configuração para Português
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarioScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventText, setEventText] = useState('');
  
  // Estado que guarda as tarefas por data
  const [agenda, setAgenda] = useState({
    '2025-12-29': [{ id: '1', title: 'Entrega do Projeto TimeTrack' }],
  });

  const addEvent = () => {
    if (eventText.trim() === '') return;
    
    const newEvent = { id: Math.random().toString(), title: eventText };
    const currentEvents = agenda[selectedDate] || [];
    
    setAgenda({
      ...agenda,
      [selectedDate]: [...currentEvents, newEvent]
    });
    
    setEventText('');
    setModalVisible(false);
  };

  const deleteEvent = (id) => {
    const updatedEvents = agenda[selectedDate].filter(e => e.id !== id);
    setAgenda({ ...agenda, [selectedDate]: updatedEvents });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header Estilizado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
          <ChevronLeft color="#1A1A1A" size={26} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minha Agenda</Text>
        <View style={{ width: 45 }} />
      </View>

      {/* Card do Calendário */}
      <View style={styles.calendarCard}>
        <Calendar
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={{
            ...Object.keys(agenda).reduce((acc, date) => {
              acc[date] = { marked: true, dotColor: '#6C5CE7' };
              return acc;
            }, {}),
            [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: '#6C5CE7', selectedTextColor: 'white' }
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6b1df',
            selectedDayBackgroundColor: '#6C5CE7',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#6C5CE7',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#6C5CE7',
            monthTextColor: '#1A1A1A',
            textMonthFontWeight: '800',
            arrowColor: '#6C5CE7',
          }}
          style={styles.calendarCustom}
        />
      </View>

      {/* Lista de Tarefas da Data Selecionada */}
      <View style={styles.eventsSection}>
        <View style={styles.eventsHeader}>
          <Text style={styles.dateDisplay}>
            {selectedDate.split('-').reverse().join('/')}
          </Text>
          <TouchableOpacity style={styles.addSmallBtn} onPress={() => setModalVisible(true)}>
            <Plus color="#FFF" size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={agenda[selectedDate] || []}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <CalendarIcon color="#DDD" size={50} />
              <Text style={styles.emptyText}>Nenhum compromisso para este dia.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <View style={styles.eventIndicator} />
              <View style={{ flex: 1 }}>
                <Text style={styles.eventText}>{item.title}</Text>
                <View style={styles.timeRow}>
                  <Clock size={12} color="#999" />
                  <Text style={styles.timeLabel}>Horário não definido</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => deleteEvent(item.id)}>
                <Trash2 size={18} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      {/* Modal para Novo Evento */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agendar para {selectedDate.split('-').reverse().join('/')}</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Ex: Estudar Redação..."
              value={eventText}
              onChangeText={setEventText}
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={{color: '#666', fontWeight: 'bold'}}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={addEvent}>
                <Text style={{color: '#FFF', fontWeight: 'bold'}}>Salvar na Agenda</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FE' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, paddingHorizontal: 20, marginBottom: 15 },
  backBtn: { backgroundColor: '#FFF', padding: 10, borderRadius: 15, elevation: 3 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1A1A1A' },
  calendarCard: { marginHorizontal: 20, backgroundColor: '#FFF', borderRadius: 25, overflow: 'hidden', elevation: 5, padding: 10 },
  calendarCustom: { borderRadius: 20 },
  eventsSection: { flex: 1, marginTop: 25, backgroundColor: '#FFF', borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 25, elevation: 10 },
  eventsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  dateDisplay: { fontSize: 18, fontWeight: '800', color: '#6C5CE7' },
  addSmallBtn: { backgroundColor: '#6C5CE7', width: 40, height: 40, borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 3 },
  eventCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FE', padding: 18, borderRadius: 20, marginBottom: 12 },
  eventIndicator: { width: 5, height: 35, backgroundColor: '#6C5CE7', borderRadius: 3, marginRight: 15 },
  eventText: { fontSize: 15, fontWeight: '700', color: '#333' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  timeLabel: { fontSize: 11, color: '#999' },
  emptyState: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#BBB', marginTop: 10, fontSize: 14 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#1A1A1A' },
  modalInput: { backgroundColor: '#F0F2F8', padding: 18, borderRadius: 15, fontSize: 16, marginBottom: 25 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  saveBtn: { backgroundColor: '#1A1A1A', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 15 },
});