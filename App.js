import {FlatList, StyleSheet, View} from 'react-native';
import { useState} from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";


export default function App() {
  const [goals, setGoals] = useState([]);


  return (
    <View style={styles.appContainer}>
      <GoalInput goals={goals} setGoals={setGoals} />
      <View style={styles.goalsWrapper}>
        <FlatList
            data={goals}
            renderItem={({ item }) => <GoalItem text={item.text} color={item.color} />}
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
