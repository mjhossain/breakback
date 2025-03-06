import React from "react";
import {SafeAreaView,View, Text, StyleSheet, TouchableOpacity} from "react-native";

export default function ScreenA() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Screen A</Text>
        </SafeAreaView>
    )
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"    
    }
})