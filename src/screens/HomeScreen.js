import React from "react";
import {SafeAreaView,View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Timer from '../components/timer.js';
import todoList from '../data/data.js';
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>BreakBack</Text>
      <View style={styles.timerBox}>
        <Timer />
      </View>
      <Text style={styles.todoTitle}>Todo List</Text>
      <View style={[styles.todoListBox, misc.boxWithShadow]}>
        <View style={todoListStyles.todoListItems}>
          {
            todoList.map((item) => { 
              return (
                <View style={todoListStyles.todoListItemBox} key={item.id}>
                  <Text style={todoListStyles.todoListItemTitle}>{item.title}</Text>
                  <View style={todoListStyles.todoListMark}>
                    {item.completed ? <Icon name="check" size={20} color={primaryColor} /> : null}
                    </View>
                </View>
              )
           })
          }
          
        </View>
        </View>
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
  todoListBox: {
    width: "90%",
    height: 350,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginTop: 30,
    justifyContent: "flex-start",
    alignItems: "center",
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
  },
  todoListItemBox: {
    width: "100%",
    height: 60,
    backgroundColor: primaryColor,
    borderRadius: 18,
    paddingRight: 20,
    paddingLeft: 10,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  todoListMark: {
    // alignSelf: "flex-end",
    marginLeft: "auto",
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  todoListItemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
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