import { Text, View, Pressable, Image, Dimensions, StyleSheet, Animated, Linking, ScrollView } from "react-native";
import { useEffect, useState, useRef, useCallback, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { getUserByUsername } from "../ORM";
import UserContext from '../contexts/UserContext'

const firebaseConfig = {
    apiKey: "AIzaSyBjlA_pGLOeocLz0I9vSsX8vNdOqPFTyIM",
    authDomain: "timebank-8d18c.firebaseapp.com",
    projectId: "timebank-8d18c",
    storageBucket: "timebank-8d18c.firebasestorage.app",
    messagingSenderId: "722549859113",
    appId: "1:722549859113:web:83b666be8dfbd881680d38",
    measurementId: "G-FQKP8VC22C"
};

function Services(props) {

    const [services, setServices] = useState([]);
    const [userData, setUserData] = useState(null);
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const servicesCollection = collection(db, "services");

    async function fetchServices() {
        try {
          const querySnapshot = await getDocs(servicesCollection);
          const servs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        //   querySnapshot.docs.forEach(doc => ( console.log( doc.data()) ));
        //   console.log("Services:", servs);
          return servs;
        } catch (error) {
          console.error("Error fetching servics:", error);
        }
    }

    useFocusEffect(() => {
        fetchServices().then(data => setServices(data));
    });

    function goToService(service){
        navigation.push("Service", {
            ...service
        })
    }

    const { usernameData, setUsernameData } = useContext(UserContext);

    useEffect(() => {
        async function fetchUserData() {
            try {
                console.log(usernameData)
                const data = await getUserByUsername(usernameData);
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUserData();
    }, [usernameData]);

    return (<View style={{flex: 1, width: '100%', backgroundColor: 'white'}}>
        <Text style={styles.pointsText} >{userData?.points}</Text>
        <ScrollView style={{flex: 1}}>
            {
                services.filter((service) => service.assignedTo == undefined).map((service) => {
                    return(<Pressable key={service.id} onPress={() => goToService(service)}>
                        <Card style={{backgroundColor: 'white', margin: 10}}>
                            <Card.Content>
                                <Title>{service.title}</Title>
                                <Paragraph>{service.location}</Paragraph>
                                <Paragraph>Points: {service.points}</Paragraph>
                            </Card.Content>
                        </Card>
                    </Pressable>)
                })
            }
        </ScrollView>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          color="white"
          onPress={() => navigation.push("AddService")}
        />
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
    pointsText: {
        fontSize: 20, // Increase font size
        fontWeight: 'bold', // Make the text bold
        color: '#4361ee', // Use a standout color like Tomato (you can change it)
        textAlign: 'center', // Center align the text
        marginVertical: 10, // Add vertical margin to space out the text
        backgroundColor: '#e4e7f7', // Add a subtle background color (optional)
        padding: 5, // Add some padding around the text for emphasis
        borderRadius: 5, // Optional: rounded corners for the background
        shadowColor: '#000', // Optional: shadow for a lifted effect
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.8, // Shadow opacity
        shadowRadius: 2, // Shadow blur radius
    }
});

export default Services;