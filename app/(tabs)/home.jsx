import { View, Text, StyleSheet, FlatList, Button, Image, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import TaskItem from '../TaskItem';
import TaskInput from '../TaskInput';
import { StatusBar } from 'react-native';

export default function Home() {
    const [finaltask, setFinalTask] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array of image paths for the slideshow
    const images = [
        require('../../assets/images/to_do.gif'),
        require('../../assets/images/home1.jpg'),
        require('../../assets/images/home2.jpg'),
    ];

    // Slideshow effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    function addTodoList(task) {
        console.log("Adding task:", task);
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
        const updatedTask = finaltask.filter((el, i) => i != index);
        setFinalTask(updatedTask);
    }

    function startHandler() {
        setIsVisible(true)
    }

    function closeHandler() {
        setIsVisible(false)
    }

    return (
        <>
            <StatusBar barStyle="default'" backgroundColor="#800080" />
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.welcomeText}>Welcome to my To-Do app</Text>
                </View>

                <View style={styles.dummyText}>
                    <Text style={styles.dummyTextContent}>
                        This is a simple "{Platform.OS}" application using React Native
                    </Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={images[currentImageIndex]}
                    />
                    <View style={styles.dotContainer}>
                        {images.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    currentImageIndex === index && styles.activeDot
                                ]}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#e6e6fa',
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        marginTop: 10,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    welcomeText: {
        fontFamily: 'outfit',
        fontSize: 25,
        flex: 1,
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
        fontFamily: 'outfit',
    },
    dummyTextContent: {
        textAlign: 'center',
    },
    todoContainer: {
        marginTop: 16,
        flex: 1
    },
    tasksHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    image: {
        width: 370,
        height: 520,
        borderRadius: 10,
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#800080',
    },
});