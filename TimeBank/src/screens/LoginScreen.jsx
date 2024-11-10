import { Text, View, TextInput, Pressable, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Keyboard, Alert, Animated } from "react-native";
import { useEffect, useState, useContext, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, query, where } from "firebase/firestore";
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { checkCredentials } from "../ORM";
import UserContext from "../contexts/UserContext";

function LoginScreen(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {usernameData, setUsernameData} = useContext(UserContext);

    const navigation = useNavigation();

    function register(){
        navigation.push("Register");
    }

    function login(){
        checkCredentials(username, password).then((success) => {
            console.log("success", success);
            if(success){
                setUsernameData(username);
                navigation.push("Tabs");
            } else {
                Alert.alert(
                    "Login failed",              // Title of the alert
                    "Username and password not found in database",  // Message
                    [
                        {
                            text: "OK",   // Button text
                            onPress: () => console.log("OK pressed"),  // Action when button is pressed
                        },
                    ],
                    { cancelable: true }  // This will prevent closing the alert by tapping outside
                );
            }
        })
    }

    return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.page}>
        <Text style={styles.label}> Time Bank </Text>
        <TextInput
            style={[styles.input, {marginBottom: 20}]}
            placeholder="username"
            value={username}
            onChangeText={setUsername}
        />
        <TextInput
            style={styles.input}
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={login}>
                    <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <View style={{marginTop: 10, flexDirection: "row"}}>
            <Text>Need an account? </Text>
            <Pressable onPress={register}>
                <Text style={{color: 'blue', textDecorationLine: 'underline'}}> Register</Text>
            </Pressable>
        </View>
        
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
        fontSize: 40, // Increase the font size
        marginBottom: 8,
        color: '#4361ee', // Neon color
        // textShadowColor: '#000', // Neon glow
        // textShadowOffset: { width: -0.5, height: 0.5 },
        // textShadowRadius: 5,
        fontWeight: 'bold',
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
  

export default LoginScreen;