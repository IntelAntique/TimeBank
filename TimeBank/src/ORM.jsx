import { useEffect, useState, useRef, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Avatar, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

const firebaseConfig = {
    apiKey: "AIzaSyBjlA_pGLOeocLz0I9vSsX8vNdOqPFTyIM",
    authDomain: "timebank-8d18c.firebaseapp.com",
    projectId: "timebank-8d18c",
    storageBucket: "timebank-8d18c.firebasestorage.app",
    messagingSenderId: "722549859113",
    appId: "1:722549859113:web:83b666be8dfbd881680d38",
    measurementId: "G-FQKP8VC22C"
};

// function TODOs

function addDonation() {
    const navigation = useNavigation();
    navigation.navigate("AddDonation");
}

function readDonations() {
    const navigation = useNavigation();
    navigation.navigate("Donation");
}

function updateDonation() {
    const navigation = useNavigation();
    navigation.navigate("UpdateDonation");
}

function removeDonation() {
    const navigation = useNavigation();
    navigation.navigate("RemoveDonation");
}

function addService() {
    const navigation = useNavigation();
    navigation.navigate("AddDonation");
}

function readServices() {
    const navigation = useNavigation();
    navigation.navigate("Donation");
}

function updateService() {
    const navigation = useNavigation();
    navigation.navigate("UpdateDonation");
}

function removeService() {
    const navigation = useNavigation();
    navigation.navigate("RemoveDonation");
}