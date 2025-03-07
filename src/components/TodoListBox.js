import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import todoList from '../data/data.js';

export default TodoListBox = () => {
  return (
    <View style={[todoListStyles.todoListBox, misc.boxWithShadow]}>
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

