import { Text, View, Pressable, Image, Dimensions, StyleSheet, Animated, Linking, ScrollView , Button } from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Avatar, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { readDonations } from "../ORM";
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

function Donations(props) {
    const [donationItems, setDonationItems] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        readDonations().then(data => setDonationItems(data));
    }, []);

    const moreInfo = (donation) => {
        navigation.navigate("Donation", {
            details: donation
        })
    }

    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

    return (<View style={{flex: 1}}>
        <ScrollView>
            {donationItems.map((donation) => (
                <Pressable key={donation.id} onPress={() => moreInfo(donation)}>
                    <Card>
                        <Card.Title title={donation.donator} subtitle={donation.description} left={LeftContent} />
                        {/* <Card.Content>
                            <Title>{donation.title}</Title>
                            <Paragraph>{donation.description}</Paragraph>
                        </Card.Content>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Actions>
                            <Button title="Cancel" />
                            <Button title="Ok" />
                        </Card.Actions> */}
                    </Card>
                </Pressable>
                
            ))}
        </ScrollView>
        
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => console.log('Pressed')}
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
        padding: 8
      }
});

export default Donations;