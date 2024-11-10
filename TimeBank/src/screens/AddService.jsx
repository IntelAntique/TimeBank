import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, query, where } from "firebase/firestore";
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { addService } from "../ORM";

const firebaseConfig = {
    apiKey: "AIzaSyBjlA_pGLOeocLz0I9vSsX8vNdOqPFTyIM",
    authDomain: "timebank-8d18c.firebaseapp.com",
    projectId: "timebank-8d18c",
    storageBucket: "timebank-8d18c.firebasestorage.app",
    messagingSenderId: "722549859113",
    appId: "1:722549859113:web:83b666be8dfbd881680d38",
    measurementId: "G-FQKP8VC22C"
};

function AddService(props) {

    props = props.route.params;
    const [serviceName, setServiceName] = useState('');
    const [serviceLocation, setServiceLocation] = useState('');
    const [serviceHours, setServiceHours] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const navigation = useNavigation();

    function insertService(){
        let service = {
            description: serviceDescription,
            location: serviceLocation,
            points: serviceHours,
            requester: "Bob", // placeholder for now
            title: serviceName
        }
        addService(service).then(navigation.reset({
            index: 0, // The first screen after reset
            routes: [{ name: 'Services' }], // Navigate to the "Services" screen
        }));
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.page}>
        <Card style={{backgroundColor: 'white', margin: 10, alignItems: 'center'}}>
            <Card.Content style={{alignItems: 'center'}}>
                <Text style={styles.label}>What service are you requesting?</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Mow the lawn"
                    value={serviceName}
                    onChangeText={setServiceName}
                />
                <Text style={styles.label}>What location is the service occurring at?</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter the service location"
                value={serviceLocation}
                onChangeText={setServiceLocation}
            />

            <Text style={styles.label}>Approximately how many hours will this service take (used to determine number of points)?</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter number of hours"
                value={serviceHours}
                keyboardType="numeric"
                onChangeText={setServiceHours}
            />

            <Text style={styles.label}>Please describe in detail what volunteers have to do to complete the service.</Text>
            <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Enter the service description"
                value={serviceDescription}
                multiline={true}
                onChangeText={setServiceDescription}
            />

            {/* TODO: Once log in logic is implemented, check that the user has enough points  */}
                <TouchableOpacity style={styles.button} onPress={insertService}>
                    <Text style={styles.buttonText}>Add Service</Text>
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
        width: "100%",
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

export default AddService;