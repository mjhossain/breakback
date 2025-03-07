import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import todoListData from '../data/data.js';

export default TodoListBox = () => {

  const [todoList, setTodoList] = useState(todoListData);


  const handleTodoList = (id) => {
    const newTodoList = todoList.map((item) => item.id == id ? {...item, completed: !item.completed} : item);
    setTodoList(newTodoList);
  }

  const addTodo = () => {
    const newTodoList = [...todoList, {id: todoList.length + 1, title: 'New Todo', completed: false}];
    setTodoList(newTodoList);
  }


  const handleAddTodo = () => {  
    addTodo();
  }


  return (
    <View style={[todoListStyles.todoListBox, misc.boxWithShadow]}>
        <View style={todoListStyles.todoListItems}>
          {
            todoList.slice(0, 3).map((item) => { 
              return (
                <View style={todoListStyles.todoListItemBox} key={item.id}>
                  <Text style={todoListStyles.todoListItemTitle}>{item.title}</Text>
                  <TouchableOpacity style={todoListStyles.todoListMark} onPress={() => handleTodoList(item.id)}>
                    {item.completed ? <Icon name="check" size={20} color={primaryColor} /> : null}
                  </TouchableOpacity>
                </View>
              )
           })
          }
          <TouchableOpacity style={todoListStyles.todoListButton} onPress={handleAddTodo}>
            <Text style={todoListStyles.todoListButtonText}>Add Todo</Text>
          </TouchableOpacity>
        </View>
      </View>     
  )
}

const primaryColor = "#FF6652";

const todoListStyles = StyleSheet.create({
    todoListBox: {
        width: "90%",
        height: 320,
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        marginTop: 30,
        justifyContent: "flex-start",
        alignItems: "center",
    },
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
    },
    todoListButton: {
      width: "100%",
      height: 60,
      backgroundColor: primaryColor,
      borderRadius: 18,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    todoListButtonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
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

