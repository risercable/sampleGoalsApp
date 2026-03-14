import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useRef, useState} from "react";
import { debounce } from "lodash";

const Item = ({ title, color }) => (
    <View style={[styles.item, { backgroundColor: color }]}>
      <Text style={styles.title}>{title}</Text>
    </View>
);

const pastelColors = [
  "#FFD6E0",
  "#E7F3F2",
  "#FFF3CD",
  "#D6E4FF",
  "#E2F0CB",
  "#F8D7DA",
  "#E0BBE4",
];

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [goals, setGoals] = useState([]);
  const inputRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const lastColorIndex = useRef(-1);

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
    const { color, index } = getRandomColor(lastColorIndex.current);
    lastColorIndex.current = index;

    setGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoalText, color }
    ]);

    if (inputRef.current) {
      inputRef.current.clear();
      setIsDisabled(true);
    }
  }

  function getRandomColor(lastIndex) {
    let newIndex;

    do {
      newIndex = Math.floor(Math.random() * pastelColors.length);
    } while (newIndex === lastIndex);

    return { color: pastelColors[newIndex], index: newIndex };
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
        <FlatList  data={goals}
                   renderItem={({ item }) => <Item title={item.text} color={item.color} />}
                   keyExtractor={(goal, index) => index} />
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
  item: {
    backgroundColor: '#e7f3f2',
    padding: 12,
    marginVertical: 2,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
})
