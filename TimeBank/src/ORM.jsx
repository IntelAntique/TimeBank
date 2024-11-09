import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBjlA_pGLOeocLz0I9vSsX8vNdOqPFTyIM",
    authDomain: "timebank-8d18c.firebaseapp.com",
    projectId: "timebank-8d18c",
    storageBucket: "timebank-8d18c.firebasestorage.app",
    messagingSenderId: "722549859113",
    appId: "1:722549859113:web:83b666be8dfbd881680d38",
    measurementId: "G-FQKP8VC22C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addDonation(donation) {
    try {
        const docRef = await addDoc(collection(db, "donations"), donation);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function readDonations() {
    const querySnapshot = await getDocs(collection(db, "donations"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateDonation(id, updatedDonation) {
    try {
        const donationRef = doc(db, "donations", id);
        await updateDoc(donationRef, updatedDonation);
        console.log("Document updated with ID: ", id);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

export async function removeDonation(id) {
    try {
        const donationRef = doc(db, "donations", id);
        await deleteDoc(donationRef);
        console.log("Document deleted with ID: ", id);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export async function addService(service) {
    try {
        const docRef = await addDoc(collection(db, "services"), service);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function readServices() {
    const [serviceItems, setServiceItems] = useState([]);

    useEffect(() => {
        async function fetchServices() {
            const querySnapshot = await getDocs(collection(db, "services"));
            const services = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setServiceItems(services);
        }
        fetchServices();
    }, []);

    return serviceItems;
}

export async function updateService(id, updatedService) {
    try {
        const serviceRef = doc(db, "services", id);
        await updateDoc(serviceRef, updatedService);
        console.log("Document updated with ID: ", id);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

export async function removeService(id) {
    try {
        const serviceRef = doc(db, "services", id);
        await deleteDoc(serviceRef);
        console.log("Document deleted with ID: ", id);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }

}