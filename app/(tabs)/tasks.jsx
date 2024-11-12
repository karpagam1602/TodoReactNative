import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import TaskItem from '../TaskItem';
import TaskInput from '../TaskInput';
import { StatusBar } from 'react-native';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react-native';

export default function Tasks() {
  const [finaltask, setFinalTask] = useState([
    {
      id: '1',
      text: 'Drink plenty of water',

    },
    {
      id: '2',
      text: 'Read books',

    },
  ]);

  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    total: 2,
    completed: 0,
    pending: 2
  });

  function addTodoList(task) {
    if (task && !finaltask.some(item => item.text === task)) {
      const newTask = {
        id: Date.now().toString(),
        text: task,

        dueDate: new Date().toISOString().split('T')[0]
      };
      setFinalTask(prevTask => [...prevTask, newTask]);
      setStats(prev => ({
        ...prev,
        total: prev.total + 1,
        pending: prev.pending + 1
      }));
    } else if (finaltask.some(item => item.text === task)) {
      alert('Task already exists');
    } else {
      alert('Please enter a task');
    }
  }

  function deleteTask(id) {
    setFinalTask(prevTasks => prevTasks.filter(task => task.id !== id));
    setStats(prev => ({
      ...prev,
      total: prev.total - 1,
      pending: prev.pending - 1,
      completed: prev.completed + 1

    }));
  }

  function startHandler() {
    setIsVisible(true);
  }

  function closeHandler() {
    setIsVisible(false);
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>My Tasks</Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Clock size={24} color="#666" />
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statBox}>
            <CheckCircle2 size={24} color="#4CAF50" />
            <Text style={styles.statNumber}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Done</Text>
          </View>
          <View style={styles.statBox}>
            <Calendar size={24} color="#FF9800" />
            <Text style={styles.statNumber}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {/* Add Task Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={startHandler}
        >
          <Text style={styles.addButtonText}>+ Add New Task</Text>
        </TouchableOpacity>

        <TaskInput closehandle={closeHandler} visible={isVisible} addTask={addTodoList} />

        {/* Tasks List */}
        <View style={styles.todoContainer}>
          <Text style={styles.tasksHeader}>Today's Tasks</Text>
          <Text style={styles.taskssubHeader}>
            Tap on the task to mark it as " completed "
          </Text>

          <FlatList
            data={finaltask}
            renderItem={({ item }) => (
              <TaskItem
                text={item.text}
                priority={item.priority}
                dueDate={item.dueDate}
                delTask={() => deleteTask(item.id)}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No tasks for today!</Text>
                <Text style={styles.emptySubText}>Tap the + button to add a task</Text>
              </View>
            }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#e6e6fa',
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#800080',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  todoContainer: {
    flex: 1,
  },
  tasksHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  taskssubHeader: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,

  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  }
});