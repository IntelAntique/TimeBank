import { Text, View, Pressable, Image, Dimensions, StyleSheet, Animated, Linking, ScrollView, RefreshControl } from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { Avatar, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { readDonations } from "../ORM";

function Donations(props) {
    const [donationItems, setDonationItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        setLoading(true);
        const data = await readDonations();
        setDonationItems(data);
        setLoading(false);
    };

    const moreInfo = (donation) => {
        navigation.navigate("Donation", {
            ...donation
        });
    };

    const LeftContent = props => <Avatar.Icon {...props} icon="gift" backgroundColor="#4361ee"/>;

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchDonations} />
                }
            >
                {donationItems.filter((donation) => donation.assignedTo == undefined).filter((donation) => donation.completed == false).map((donation) => (
                    <Pressable key={donation.id} onPress={() => moreInfo(donation)}>
                        <Card style={{backgroundColor: 'white', margin: 10}}>
                            <Card.Title title={donation.donator} subtitle={donation.description} left={LeftContent} />
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
        </View>
    );
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
