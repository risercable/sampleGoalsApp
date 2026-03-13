import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { useRef } from "react";
import { debounce } from "lodash";

export default function App() {

  const handler = useRef(
      debounce((text) => {
        console.log("Debounced:", text);
      }, 500)
  ).current;

  function goalInputHandler(enteredText) {
    handler(enteredText);
  }

  function addNewGoalHandler() {}

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
            placeholder='Your Current Goal!'
            onChangeText={goalInputHandler}
            style={styles.textInput}
        />
        <Button title='Add Goal'></Button>
      </View>
      <View style={styles.goalsWrapper}>
        <Text>List of goals :) ...</Text>
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
  }
})
