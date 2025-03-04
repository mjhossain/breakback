import React from "react";
import {SafeAreaView,View, Text, StyleSheet, TouchableOpacity} from "react-native";
// import Icon from '@react-native-vector-icons/fontawesome';

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.timerBox}>
        <Text style={timerStyles.timerText}>00:00</Text>
        <View style={timerStyles.timerButtons}>
            <TouchableOpacity style={timerStyles.timerButton}>
              {/* <Icon name="play" size={20} color="white" /> */}
              <Text style={timerStyles.timerButtonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={timerStyles.timerButton}>
              {/* <Icon name="play" size={20} color="white" /> */}
              <Text style={timerStyles.timerButtonText}>Stop/Reset</Text>
            </TouchableOpacity>
        </View>
        
      </View>
      <View style={styles.todoListBox}>
        <Text style={todoListStyles.todoListTitle}>Todo List</Text>
        <View style={todoListStyles.todoListItems}>
          <Text style={todoListStyles.todoListItem}>Item 1</Text>
          <Text style={todoListStyles.todoListItem}>Item 2</Text>
          <Text style={todoListStyles.todoListItem}>Item 3</Text>
        </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
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
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginTop: 30,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  todoListBox: {
    width: "90%",
    height: 500,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginTop: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    }
});

const timerStyles = StyleSheet.create({
  timerText: {
    fontSize: 60,
    fontWeight: "bold",
    color: "black",
  },
  timerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    // backgroundColor: "red",
    marginTop: 20,
  },
  timerButton: {
    width: "50%",
    height: "100%",
    // backgroundColor: "#fefefe",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  timerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  }
});

const todoListStyles = StyleSheet.create({
  todoListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 20,
  },

  todoListItems: {
    width: "100%",
    height: "100%",
    // backgroundColor: "red",
    marginTop: 20,
    padding: 20,
  },
  todoListItem: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  }
});