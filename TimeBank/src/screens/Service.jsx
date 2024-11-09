import { Text, View, Pressable, Image, Dimensions, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, query, where } from "firebase/firestore";
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
// import { useNavigation } from "@react-navigation/native";

const firebaseConfig = {
    apiKey: "AIzaSyBjlA_pGLOeocLz0I9vSsX8vNdOqPFTyIM",
    authDomain: "timebank-8d18c.firebaseapp.com",
    projectId: "timebank-8d18c",
    storageBucket: "timebank-8d18c.firebasestorage.app",
    messagingSenderId: "722549859113",
    appId: "1:722549859113:web:83b666be8dfbd881680d38",
    measurementId: "G-FQKP8VC22C"
};

function Service(props) {

    props = props.route.params;

    console.log("props", props);

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // console.log("requester", props.requester);

    //     // Function to fetch user by username
    //     async function getUserByUsername(username) {
    //         try {
    //             // Reference to the users collection
    //             const usersCollection = collection(db, "users");
                
    //             // Create a query to find a user with the specific username
    //             const userQuery = query(usersCollection, where("username", "==", username));
                
    //             // Fetch the matching documents
    //             const querySnapshot = await getDocs(userQuery);
                
    //             if (querySnapshot.empty) {
    //                 setError("User not found!");
    //             } else {
    //                 // If a matching user is found, set the user state
    //                 const userDoc = querySnapshot.docs[0]; // Get the first matching document
    //                 setRequester(userDoc.data());
    //             }
    //         } catch (err) {
    //             console.log("Error fetching user data: ", err.message);
    //         }
    //     }

    // useEffect(() => {
    //     getUserByUsername(props.requester);
    // }, []);

    return (<View style={styles.page}>
        <Card style={{backgroundColor: 'white', margin: 10, alignItems: 'center'}}>
            <Card.Content style={{alignItems: 'center'}}>
                <Title>{props.title}</Title>
                <Paragraph>Requested by {props.requester}</Paragraph>
                <Paragraph>{props.location}</Paragraph>
                <Paragraph>Points: {props.points}</Paragraph>
                <Paragraph>{props.description}</Paragraph>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
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

export default Service;