import React from "react";
import {SafeAreaView,View, Text, StyleSheet} from "react-native";
import Timer from '../components/Timer.js';
import TodoListBox from '../components/TodoListBox.js';
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>BreakBack</Text>
      <View style={styles.timerBox}>
        <Timer />
      </View>
      <Text style={styles.todoTitle}>Todo List</Text>
      <TodoListBox />
    </SafeAreaView>
  )
}

const primaryColor = "#FF6652";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FFEBEB",
    alignItems: "center"  
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"  
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  timerBox: {
    width: "90%",
    height: 200,
    marginTop: 30,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: primaryColor,
    alignSelf: "flex-start",
    marginLeft: 20,
    fontFamily: "Jersey 25",
  },
  todoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 20,
    color: primaryColor,
    fontFamily: "Jersey 25",
  }
});


const misc = StyleSheet.create({
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,  
    elevation: 5
  }
});