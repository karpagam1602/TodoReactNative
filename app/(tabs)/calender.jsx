import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarTab = () => {
  const [marked, setMarked] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [description, setDescription] = useState('');
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [dateDescriptions, setDateDescriptions] = useState({});

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    if (dateDescriptions[day.dateString]) {
      setViewModalVisible(true);
    } else {
      setModalVisible(true);
    }
  };

  const handleSave = () => {
    if (description.trim()) {
      const existingDescriptions = dateDescriptions[selectedDate] || [];
      const updatedDescriptions = [...existingDescriptions, description];

      setDateDescriptions(prev => ({
        ...prev,
        [selectedDate]: updatedDescriptions
      }));

      setMarked(prev => ({
        ...prev,
        [selectedDate]: {
          marked: true,
          selectedColor: '#800080',
          selectedTextColor: 'white',
          dots: updatedDescriptions.map((_, index) => ({
            key: `dot${index}`,
            color: '#800080'
          })),
          description: updatedDescriptions.join(', ')
        }
      }));
    }
    setModalVisible(false);
    setDescription('');
  };

  const handleDeleteDescription = (dateString, index) => {
    Alert.alert(
      'Delete Description',
      'Are you sure you want to delete this description?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedDescriptions = dateDescriptions[dateString].filter((_, i) => i !== index);
            if (updatedDescriptions.length === 0) {
              const newDateDescriptions = { ...dateDescriptions };
              delete newDateDescriptions[dateString];
              setDateDescriptions(newDateDescriptions);

              const newMarked = { ...marked };
              delete newMarked[dateString];
              setMarked(newMarked);
            } else {
              setDateDescriptions(prev => ({
                ...prev,
                [dateString]: updatedDescriptions
              }));

              setMarked(prev => ({
                ...prev,
                [dateString]: {
                  marked: true,
                  selectedColor: '#800080',
                  selectedTextColor: 'white',
                  dots: updatedDescriptions.map((_, index) => ({
                    key: `dot${index}`,
                    color: '#800080'
                  })),
                  description: updatedDescriptions.join(', ')
                }
              }));
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  const renderInputModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Add Description for {selectedDate}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => {
              setModalVisible(false);
              setDescription('');
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderViewModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={viewModalVisible}
      onRequestClose={() => setViewModalVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Descriptions for {selectedDate}</Text>
        <ScrollView style={styles.descriptionList}>
          {dateDescriptions[selectedDate]?.map((desc, index) => (
            <TouchableOpacity
              key={index}
              style={styles.descriptionItem}
              onLongPress={() => handleDeleteDescription(selectedDate, index)}
            >
              <Text style={styles.descriptionText}>{desc}</Text>
              <Text style={styles.descriptionHint}>Long press to delete</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.viewModalButtons}>
          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={() => setViewModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={() => {
              setViewModalVisible(false);
              setModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>Add More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendar</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={marked}
        markingType="multi-dot"
        style={styles.calendar}
      />
      {renderInputModal()}
      {renderViewModal()}

      <View>
        <Text style={styles.marktext}>
          * To mark your events, click the date *
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 39,
    flex: 1,
    padding: 20,
    backgroundColor: '#e6e6fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calendar: {
    borderWidth: 2,
    borderColor: '#800080',
    borderRadius: 10,
    padding: 35,
  },
  modalView: {
    margin: 20,
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    minHeight: 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    minWidth: 100,
    alignItems: 'center',
    margin: 5,
  },
  saveButton: {
    backgroundColor: '#800080',
  },
  cancelButton: {
    backgroundColor: '#888',
  },
  closeButton: {
    backgroundColor: '#800080',
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  descriptionList: {
    width: '100%',
    maxHeight: 200,
  },
  descriptionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  descriptionText: {
    fontSize: 16,
  },
  descriptionHint: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
  },
  viewModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  legend: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    maxHeight: 150,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendScroll: {
    flex: 1,
  },
  legendItem: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  legendDate: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  legendDescription: {
    flex: 1,
    color: '#666',
  }, marktext: {
    fontSize: 18,
    color: '#800080',
    padding: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }

});

export default CalendarTab;