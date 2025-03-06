import React from "react";
import HomeScreen from "./src/screens/HomeScreen.js";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./src/navigation/BottomTab";


export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  )
}
