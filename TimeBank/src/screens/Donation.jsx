import { Text, View, Pressable, Image, Dimensions, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, query, where } from "firebase/firestore";
import { Card, Title, Paragraph, FAB } from 'react-native-paper';

function Donation(props) {

    props = props.route.params;

    console.log("props", props);

    return (<View style={styles.page}>
        <Card style={{backgroundColor: 'white', margin: 10, alignItems: 'center'}}>
            <Card.Content style={{alignItems: 'center'}}>
                <Title>{props.title}</Title>
                <Paragraph>Donated by {props.donator}</Paragraph>
                <Paragraph>{props.location}</Paragraph>
                <Paragraph>{props.description}</Paragraph>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
            </Card.Content>
        </Card>
        
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