import { Text, View, Pressable, Image, Alert, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";
import { useContext, useState, useRef, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, query, where } from "firebase/firestore";
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { assignDonationToUser } from "../ORM";
import UserContext from "../contexts/UserContext";

function Donation(props) {

    props = props.route.params;

    const {usernameData, setUsernameData} = useContext(UserContext);
    const navigation = useNavigation();

    function signUp(){
        assignDonationToUser(props.id, usernameData);
        Alert.alert(
            "Successfully signed up",              // Title of the alert
            "View events you signed up for in the My Events tab",  // Message
            [
                {
                    text: "OK",   // Button text
                    onPress: () => console.log("OK pressed"),  // Action when button is pressed
                },
            ],
            { cancelable: true }  // This will prevent closing the alert by tapping outside
        );
        navigation.reset({
            index: 0, // The first screen after reset
            routes: [{ name: 'Donations' }], // Navigate to the "Services" screen
        });
    }

    return (<View style={styles.page}>
        <Card style={{backgroundColor: 'white', margin: 10, alignItems: 'center'}}>
            <Card.Content style={{alignItems: 'center'}}>
                <Title>{props.title}</Title>
                <Paragraph>Donated by {props.donator}</Paragraph>
                <Paragraph>{props.location}</Paragraph>
                <Paragraph>{props.description}</Paragraph>
                <TouchableOpacity style={styles.button} onPress={signUp}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
            </Card.Content>
        </Card>
        
    </View>);
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
        // alignItems: 'center',  
      },
      button: {
        backgroundColor: '#4361ee', // Set the button background color
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: 300,
        borderRadius: 30, // Rounded corners
        marginTop: 30
      },
      buttonText: {
        color: 'white', // Text color
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      }
});

export default Donation;