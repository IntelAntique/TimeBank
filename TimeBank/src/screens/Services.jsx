import { Text, View, Pressable, Image, Dimensions, StyleSheet, Animated, Linking, ScrollView } from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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

    useEffect(() => {
        fetchServices().then(data => setServices(data));
    }, [])

    function goToService(service){
        navigation.push("Service", {
            ...service
        })
    }

    return (<View style={{flex: 1, width: '100%', backgroundColor: 'white'}}>
        <ScrollView style={{flex: 1}}>
            {
                services.map((service) => {
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
      }
});

export default Services;