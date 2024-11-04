import { StyleSheet, View, Text, Pressable } from "react-native";

function TaskItem(props) {
    return (
        <View style={styles.taskItem}>
            <Pressable
                onPress={props.delTask}
                // android_ripple={{ color: '#dddddd' }}
                style={({ pressed }) => pressed && styles.pressedItem}
            >
                <Text style={styles.taskText}>
                    {props.text}
                </Text>
            </Pressable>
        </View>
    );
}

export default TaskItem;

const styles = StyleSheet.create({
    taskItem: {
        margin: 8,
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#b768a2',
    },
    pressedItem: {
        opacity: 0.5,
        transform: [{ scale: 0.95 }],
        elevation: 4,
    },
    taskText: {
        color: 'white',
        fontWeight: 'bold'
    }
});