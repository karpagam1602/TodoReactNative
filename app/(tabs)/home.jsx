import { View, Text, StyleSheet, FlatList, Button, Image } from 'react-native';
import React, { useState } from 'react';
import TaskItem from '../TaskItem';
import TaskInput from '../TaskInput';
import { StatusBar } from 'react-native';

export default function Home() {
  const [finaltask, setFinalTask] = useState([]);
  const [isVisible, setIsVisible] = useState(false)

  function addTodoList(task) { // we can't move this to textInput becoz here we r in need of finaltask state
    console.log("Adding task:", task); // Log the task being added
    if (task && !finaltask.includes(task)) {
      setFinalTask((prevTask) => [...prevTask, task]);
    } else if (finaltask.includes(task)) {
      alert('Task already exists');
    } else {
      alert('Please enter a task');
    }
  }

  function deleteTask(index) {
    console.log("delete event", index)
    const updatedTask = finaltask.filter((el, i) => i != index); // here el is the parameter and i is the index value of that parameter
    setFinalTask(updatedTask);

  }

  function startHandler() {
    setIsVisible(true)
  }
  function closeHandler() {
    setIsVisible(false)
  }

  //statusbar is the upper portion of app - we can change the their appearance using style prop
  return (
    <>
      <StatusBar style='light' />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to my To-Do app</Text>
        <View style={styles.dummyText}>
          <Text style={styles.dummyTextContent}>
            This is a simple mobile application using React Native
          </Text>
        </View>
        {/* <Button title='Add New Task' color="#800080" onPress={startHandler} /> */}
        {/* <TaskInput closehandle={closeHandler} visible={isVisible} addTask={addTodoList} /> */}

        {/* <View style={styles.todoContainer}>


          <Text style={styles.tasksHeader}>Tasks To do !!</Text>
          <FlatList
            data={finaltask}
            renderItem={({ item, index }) => {
              return <TaskItem text={item} delTask={() => deleteTask(index)} />;
            }}
          />
        </View> */}

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../assets/images/home1.jpg')} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //it will take 1 for this remaining for goals container flex specfies: total space
    backgroundColor: '#e6e6fa',
    padding: 16,
  },
  welcomeText: {
    fontFamily: 'outfit',
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 20,
    marginTop: 10
  },
  dummyText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    borderWidth: 2,
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderColor: '#800080',
    shadowColor: '#000',
    elevation: 3,
    overflow: 'hidden',
    fontFamily: 'Arial',
  },
  dummyTextContent: {
    textAlign: 'center',
  },

  todoContainer: {
    marginTop: 16,
    flex: 1 // to give space for todo container to scroll
  },
  tasksHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  }, imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  }, image: {
    width: 350,
    height: 470,

  }

});