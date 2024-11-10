import { Text, View, Pressable, Image, Alert, StyleSheet, TouchableOpacity, Linking, ScrollView, Platform } from "react-native";
import { useContext, useState, useRef, useCallback, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, query, where } from "firebase/firestore";
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { assignDonationToUser } from "../ORM";
import UserContext from "../contexts/UserContext";
import MapView, { PROVIDER_GOOGLE, Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';


function Donation(props) {

    props = props.route.params;

    const [location, setLocation] = useState({ coords: { latitude: 0, longitude: 0 } });
    const [region, setRegion] = useState(null);
    const {usernameData, setUsernameData} = useContext(UserContext);
    const navigation = useNavigation();
    const mapRef = useRef(null);

    useEffect(() => {
        (async () => {
            let { status } = await requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await getCurrentPositionAsync({});
            setLocation(location);
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        })();
    }, []);

    useEffect(() => {
        if (mapRef.current && region) {
            if (Platform.OS === 'ios') {
                mapRef.current.animateCamera({
                    center: {
                        latitude: region.latitude,
                        longitude: region.longitude
                    },
                    zoom: 15, // Adjust this value as needed
                    pitch: 0,
                    heading: 0,
                    altitude: 0
                }, { duration: 500 });
            } else {
                mapRef.current.animateToRegion(region, 1000);
            }
        }
    }, [region]);

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
            <Card.Content>
                <View style={{flexDirection: "row"}}>
                    <View style={{marginRight: 10}}>
                        <Title>{props.title}</Title>
                        <Paragraph>{props.description}</Paragraph>
                    </View>
                    <View style={{alignItems: 'flex-end', flex: 1}}>
                        <Paragraph>{props.location}</Paragraph>
                        <Paragraph>Donator: {props.donator}</Paragraph>
                    </View>
                </View>
                
                <TouchableOpacity style={styles.button} onPress={signUp}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
            </Card.Content>
        </Card>
        <View style={styles.container}>
            <MapView 
                ref={mapRef}
                provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT} 
                showsUserLocation={true}
                showsMyLocationButton={true}
                style={{width: '100%', height: '100%'}}
                initialRegion={region} > 
                
                <Marker coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }}/>
            </MapView>
        </View>
        
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