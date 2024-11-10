import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";
import { useEffect, useState, useRef, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, query, where } from "firebase/firestore";
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { addDonation } from "../ORM";
import UserContext from "../contexts/UserContext";

const firebaseConfig = {
    apiKey: "AIzaSyBjlA_pGLOeocLz0I9vSsX8vNdOqPFTyIM",
    authDomain: "timebank-8d18c.firebaseapp.com",
    projectId: "timebank-8d18c",
    storageBucket: "timebank-8d18c.firebasestorage.app",
    messagingSenderId: "722549859113",
    appId: "1:722549859113:web:83b666be8dfbd881680d38",
    measurementId: "G-FQKP8VC22C"
};

function AddDonation(props) {

    props = props.route.params;
    const [donationTitle, setDonationTitle] = useState('');
    const [donationLocation, setDonationLocation] = useState('');
    const [donationDescription, setDonationDescription] = useState('');

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const {usernameData, setUsernameData} = useContext(UserContext);

    const navigation = useNavigation();

    function insertDonation(){
        let donation = {
            description: donationDescription,
            location: donationLocation,
            points: 1,
            donator: usernameData,
            photo: "not yet implemented",
            title: donationTitle,
            completed: false
        }
        addDonation(donation).then(navigation.reset({
            index: 0, // The first screen after reset
            routes: [{ name: "Donations" }], // Navigate to the "Services" screen
          }));
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.page}>
        <Card style={{backgroundColor: 'white', margin: 10, alignItems: 'center'}}>
            <Card.Content style={{alignItems: 'center'}}>
                <Text style={styles.label}>What are you donating?</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: An old couch"
                    value={donationTitle}
                    onChangeText={setDonationTitle}
                />
                <Text style={styles.label}>Where should the donation be picked up?</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter the donation location"
                value={donationLocation}
                onChangeText={setDonationLocation}
            />

            <Text style={styles.label}>Please describe the item in detail.</Text>
            <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Enter the item description"
                value={donationDescription}
                multiline={true}
                onChangeText={setDonationDescription}
            />

            {/* TODO: Once log in logic is implemented, check that the user has enough points  */}
                <TouchableOpacity style={styles.button} onPress={insertDonation}>
                    <Text style={styles.buttonText}>Add Donation</Text>
                </TouchableOpacity>
            </Card.Content>
        </Card>
        
    </View>
    </TouchableWithoutFeedback>);
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
      },
      label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        width: 200,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        padding: 10,
    },
    descriptionInput: {
        height: 100, // Larger height for the description input
        width: 300
    },
});

export default AddDonation;