import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState} from "react";

export default function GoalInput(props) {
    const [isDisabled, setIsDisabled] = useState(true);
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText);
        setIsDisabled(!enteredText);
    }

    function addNewGoalHandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
        setIsDisabled(true);
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Your Current Goal!"
                value={enteredGoalText}
                onChangeText={goalInputHandler}
                style={styles.textInput}
                onSubmitEditing={addNewGoalHandler}
            />
            <TouchableOpacity
                onPress={addNewGoalHandler}
                disabled={isDisabled}
                style={isDisabled ? styles.buttonDisabled : styles.buttonEnabled}
            >
                <Text style={isDisabled ? styles.buttonTextDisabled : styles.buttonText}>
                    Add Goal
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '70%',
        marginRight: 8,
        borderRadius: 5
    },
    buttonEnabled: {
        backgroundColor: "blue",
        height: 40,                 // match TextInput height
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        flex: 2
    },
    buttonDisabled: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        height: 40,                 // match TextInput height
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        flex: 2
    },
    buttonText: {
        fontWeight: "bold",
        color: "white",              // for enabled
    },
    buttonTextDisabled: {
        fontWeight: "bold",
        color: "#4d4d4d",           // for disabled
    },
})
