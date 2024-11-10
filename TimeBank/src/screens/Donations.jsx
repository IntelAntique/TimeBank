import { Text, View, Pressable, Image, Dimensions, StyleSheet, Animated, Linking, ScrollView , Button } from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Avatar, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { readDonations } from "../ORM";
// import { useNavigation } from "@react-navigation/native";

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

    const LeftContent = props => <Avatar.Icon {...props} icon="gift" backgroundColor="#4361ee"/>

    return (<View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
            {donationItems.map((donation) => (
                <Pressable key={donation.id} onPress={() => moreInfo(donation)}>
                    <Card style={{backgroundColor: 'white', margin: 10}}>
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
          color="white"
          onPress={() => navigation.push('Add Donation')}
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

export default Donations;