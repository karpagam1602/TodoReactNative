import { View, TextInput, Button, StyleSheet, Modal, Image } from 'react-native'
import React, { useState } from 'react'

function TaskInput(props) {

    const [task, setTask] = useState("");

    function todoInputhandler(text) {
        setTask(text);
    }
    function addTaskhandler() {
        props.addTask(task)
        props.closehandle();
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('../assets/images/goal1.jpg')} />
                <TextInput
                    style={styles.textInput}
                    onChangeText={todoInputhandler}
                    placeholder='Type your Task here..!'
                    value={task}
                />
                <View style={styles.buttonContainer}>

                    <View style={styles.button}>
                        <Button color={'#872657'} title='cancel' onPress={props.closehandle} />
                    </View>
                    <View style={styles.button}>
                        <Button color={'#9932cc'} onPress={addTaskhandler} title='tap to add' />
                    </View>
                </View>
            </View>
        </Modal>

    )
}

export default TaskInput;


const styles = StyleSheet.create({
    inputContainer: {
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom: 24,
        flex: 1,
        padding: 16,
        backgroundColor: '#e6e6fa'

    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '90%',
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 8,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 5,
    }, button: {
        width: 100,
        marginHorizontal: 8,
        // borderRadius: 50


    }, image: {
        width: 350,
        height: 300,
        margin: 20

    }
});