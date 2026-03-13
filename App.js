import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useRef, useState} from "react";
import { debounce } from "lodash";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [goals, setGoals] = useState([]);
  const inputRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const handler = useRef(
      debounce((text) => {
        console.log("Debounced:", text);
        setEnteredGoalText(text)
      }, 500)
  ).current;

  function goalInputHandler(enteredText) {
    handler(enteredText);
    if (enteredText) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  function addNewGoalHandler() {
    setGoals((currentGoals) => [...currentGoals, enteredGoalText]);
    console.log("Adding new goal :)) - ", goals.join(', '));
    if (inputRef.current) {
      inputRef.current.clear();   // clear TextInput
      setIsDisabled(true);
    }
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
            placeholder='Your Current Goal!'
            onChangeText={goalInputHandler}
            style={styles.textInput}
            onSubmitEditing={addNewGoalHandler}
            ref={inputRef}
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
      <View style={styles.goalsWrapper}>
        {goals.map((goal, index) => (<Text>{goal}</Text>))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
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
  },
  goalsWrapper: {
    flex: 5
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
