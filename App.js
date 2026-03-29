import {Button, FlatList, StyleSheet, View} from 'react-native';
import {useRef, useState} from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const lastColorIndex = useRef(-1);
  const [goalIndex, setGoalIndex] = useState(0);

  function startAddGoal() {
    setModalVisible(true);
  }

  function getRandomColor(lastIndex) {
    let newIndex;

    do {
      newIndex = Math.floor(Math.random() * pastelColors.length);
    } while (newIndex === lastIndex);

    return { color: pastelColors[newIndex], index: newIndex };
  }


  function addNewGoalHandler(enteredGoalText) {
    if (!enteredGoalText.trim()) return;

    const { color, index } = getRandomColor(lastColorIndex.current);
    lastColorIndex.current = index;

    setGoalIndex(oldIndex => oldIndex + 1);

    setGoals((currentGoals) => [
      { id: goalIndex, text: enteredGoalText, color },
      ...currentGoals
    ]);

    setModalVisible(false);
  }

  function deleteGoalHandler(id) {
    setGoals(goals.filter(goal => goal.id !== id));
  }


  return (
    <View style={styles.appContainer}>
      <Button title='Add New Goal' color="#5e0acc" onPress={startAddGoal}></Button>
      <GoalInput visible={modalVisible} setVisible={setModalVisible} onAddGoal={addNewGoalHandler} />
      <View style={styles.goalsWrapper}>
        <FlatList
            data={goals}
            renderItem={({ item }) => (
                <GoalItem
                    text={item.text}
                    color={item.color}
                    onDeleteItem={() => deleteGoalHandler(item.id)}
                />
            )}
            keyExtractor={(item) => item.id}
        />
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
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    borderRadius: 5
  },
  goalsWrapper: {
    flex: 5,
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
