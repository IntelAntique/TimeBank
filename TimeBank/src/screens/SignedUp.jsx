import { Text, View, Pressable, Image, Dimensions, StyleSheet, Animated, Linking, ScrollView } from "react-native";
import { useEffect, useState, useRef, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getServicesAssignedToUser, getServicesRequestedByUser } from "../ORM";
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

function SignedUp(props) {

    const [requests, setRequests] = useState([]);
    const [signedUp, setSignedUp] = useState([]);
    const [donations, setDonations] = useState([]);
    const [pickups, setPickups] = useState([]);
    const {usernameData, setUsernameData} = useContext(UserContext);

    useEffect(() => {
        getServicesAssignedToUser(usernameData).then(data => setSignedUp(data));
        getServicesRequestedByUser(usernameData).then(data => setRequests(data));
    }, []);

    return (<View style={{flex: 1, width: '100%', backgroundColor: 'white'}}>
        <ScrollView style={{flex: 1}}>
            <Text style={styles.category}>Service requests {usernameData} made:</Text>
            { requests.length > 0 ?
                requests.map((request) => {
                    return(<Card style={{backgroundColor: 'white', margin: 10}}>
                            <Card.Content>
                                <Title>{request.title}</Title>
                                <Paragraph>{request.location}</Paragraph>
                                <Paragraph>Points: {request.points}</Paragraph>
                            </Card.Content>
                        </Card>);
                }) : <Text style={{textAlign: 'center', margin: 10}}>No requests made</Text>
            }
            <Text style={styles.category}>Services {usernameData} signed up for:</Text>
            {
                signedUp.map((signed) => {
                    return(<Card style={{backgroundColor: 'white', margin: 10}}>
                            <Card.Content>
                                <Title>{signed.title}</Title>
                                <Paragraph>{signed.location}</Paragraph>
                            </Card.Content>
                        </Card>);
                })
            }
            <Text style={styles.category}>{usernameData}'s Donations:</Text>
            {
                donations.map((donation) => {
                    return(<Card style={{backgroundColor: 'white', margin: 10}}>
                            <Card.Content>
                                <Title>{donation.title}</Title>
                                <Paragraph>{donation.location}</Paragraph>
                            </Card.Content>
                        </Card>);
                })
            }
            <Text style={styles.category}>Donations to be picked up:</Text>
            {
                pickups.map((pickup) => {
                    return(<Card style={{backgroundColor: 'white', margin: 10}}>
                            <Card.Content>
                                <Title>{pickup.title}</Title>
                                <Paragraph>{pickup.location}</Paragraph>
                            </Card.Content>
                        </Card>);
                })
            }
        </ScrollView>
    </View>);
}

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        margin: 30,
        right: 0,
        bottom: 0,
        borderRadius: 100,
        padding: 8,
        backgroundColor: '#4361ee',
      },
    category: {
        textAlign: 'center',
        alignContent: 'center',
        fontSize: 18,
        margin: 10
    }
});

export default SignedUp;