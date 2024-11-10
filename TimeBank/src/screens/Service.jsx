import { Text, View, Pressable, Image, Dimensions, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
// import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Service(props) {
    const [location, setLocation] = useState({ coords: { latitude: 0, longitude: 0 } });
    const [region, setRegion] = useState(null);
    const mapRef = useRef(null);

    props = props.route.params;
    
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
            mapRef.current.animateToRegion(region, 1000);
        }
    }, [region]);

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
        <View style={styles.container}>
            <MapView 
                ref={mapRef}
                provider={PROVIDER_GOOGLE} 
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
    },
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    }
});

export default Service;