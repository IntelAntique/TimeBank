import { Text, View, Pressable, Image, Dimensions, StyleSheet, Animated, Linking, ScrollView } from "react-native";
import { useEffect, useState, useRef, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Card, Title, Paragraph } from 'react-native-paper';

function Service(props) {

    console.log("props in service: ", props);
    return (<View>
        <Text>{props.title}</Text>
        <Text>{props.location}</Text>
        <Text>Points: {props.points}</Text>
        <Text>Requested by {props.requester}</Text>
        <Text>{props.description}</Text>
    </View>)
}

export default Services;