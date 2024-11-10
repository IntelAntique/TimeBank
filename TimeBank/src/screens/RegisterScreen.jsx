import { Text, View, TextInput, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Keyboard, ScrollView } from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, query, where } from "firebase/firestore";
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { addUser } from "../ORM";

function RegisterScreen(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigation = useNavigation();

    function register(){
        addUser({
            username: username,
            password: password,
            phoneNumber: phoneNumber,
            rating: -1, // default "no rating" value
            points: 5 // every user starts out with 5 points
        });
        navigation.push("Login");
    }

    return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.page}>
         <Text style={styles.label}>Username:</Text>
                <TextInput
                    style={[styles.input, {marginBottom: 20}]}
                    placeholder="username"
                    value={username}
                    onChangeText={setUsername}
                />
        <Text style={styles.label}>Password:</Text>
            <TextInput
                style={[styles.input, {marginBottom: 20}]}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
        <Text style={styles.label}>Phone number:</Text>
            <TextInput
                style={styles.input}
                placeholder="###-###-####"
                value={phoneNumber}
                // keyboardType="phone-pad"
                maxLength={12}
                onChangeText={setPhoneNumber}
            />
        <TouchableOpacity style={styles.button} onPress={register}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>);
}

const styles = StyleSheet.create({
    page: {
      backgroundColor: 'white',
      flex: 1,
      alignItems: 'center',  
      padding: 50,
    },
    inputWrapper: {
      width: 200, // Match the width of your input field
      alignItems: 'flex-start', // Align label and input to the left
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    input: {
      height: 40,
      width: '100%', // Use full width of the inputWrapper
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
    },
    button: {
      backgroundColor: '#4361ee',
      paddingVertical: 15,
      paddingHorizontal: 20,
      width: 300,
      borderRadius: 30,
      marginTop: 30,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  

export default RegisterScreen;