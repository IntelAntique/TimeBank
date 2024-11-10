import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, deleteField } from "firebase/firestore";

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

        // If you want to delete `assignedTo` field, set it to FieldValue.delete()
        const updatedData = {
            ...updatedDonation,
            ...(updatedDonation.assignedTo === undefined && { assignedTo: deleteField() })
        };

        await updateDoc(donationRef, updatedData);
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

        // If you want to delete `assignedTo` field, set it to FieldValue.delete()
        const updatedData = {
            ...updatedService,
            ...(updatedService.assignedTo === undefined && { assignedTo: deleteField() })
        };

        await updateDoc(serviceRef, updatedData);
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

export async function addUser(user) {
    try {
        const docRef = await addDoc(collection(db, "users"), user);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function updateUser(id, updatedUser) {
    try {
        const userRef = doc(db, "users", id);

        await updateDoc(userRef, updatedUser);
        console.log("Document updated with ID: ", id);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

export async function getUserByUsername(username) {
    const usersCollection = collection(db, "users");
    
    // Create a query to find services where assignedTo equals the given username
    const usersQuery = query(usersCollection, where("username", "==", username));
    
    try {
        const querySnapshot = await getDocs(usersQuery);
        
        if (querySnapshot.empty) {
            console.log("No one with this username.");
            return [];
        } else {
            const users = [];
            querySnapshot.forEach(doc => {
                users.push({ id: doc.id, ...doc.data() });
            });
            return users[0];
        }
    } catch (error) {
        console.error("Error getting user:", error);
        return [];
    }
}

export async function checkCredentials(username, password) {
    const usersCollection = collection(db, "users");

    // Query for the username first
    const userQuery = query(usersCollection, where("username", "==", username));

    try {
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            console.log("No user found with this username.");
            return false;
        } else {
            // Use a for loop to break early when a match is found
            for (const doc of querySnapshot.docs) {
                const user = doc.data();
                if (user.password === password) {
                    console.log("User authenticated:", user);
                    return true; // Return true as soon as we find the correct password
                }
            }

            // If no matching password was found
            console.log("Password does not match.");
            return false;
        }
    } catch (error) {
        console.log("Error authenticating user:", error);
        return false;
    }
}

export async function assignServiceToUser(serviceId, assignedTo) {
    try {
        // Get a reference to the service document using its ID
        const serviceRef = doc(db, "services", serviceId);  // Assuming your collection is named "services"

        // Update the document to add the "assignedTo" field
        await updateDoc(serviceRef, {
            assignedTo: assignedTo, // Add the new field
        });

        console.log("Service assigned successfully!");
    } catch (error) {
        console.error("Error assigning service:", error);
    }
}

export async function getServicesAssignedToUser(username) {
    const servicesCollection = collection(db, "services");
    
    // Create a query to find services where assignedTo equals the given username
    const servicesQuery = query(servicesCollection, where("assignedTo", "==", username));
    
    try {
        const querySnapshot = await getDocs(servicesQuery);
        
        if (querySnapshot.empty) {
            console.log("No services found assigned to this user.");
            return [];
        } else {
            const services = [];
            querySnapshot.forEach(doc => {
                services.push({ id: doc.id, ...doc.data() });
            });
            return services;
        }
    } catch (error) {
        console.error("Error getting services:", error);
        return [];
    }
}

export async function getServicesRequestedByUser(username) {
    const servicesCollection = collection(db, "services");
    
    // Create a query to find services where assignedTo equals the given username
    const servicesQuery = query(servicesCollection, where("requester", "==", username));
    
    try {
        const querySnapshot = await getDocs(servicesQuery);
        
        if (querySnapshot.empty) {
            console.log("No services found requested to this user.");
            return [];
        } else {
            const services = [];
            querySnapshot.forEach(doc => {
                services.push({ id: doc.id, ...doc.data() });
            });
            return services;
        }
    } catch (error) {
        console.error("Error getting services:", error);
        return [];
    }
}

export async function assignDonationToUser(donationId, assignedTo) {
    try {
        // Get a reference to the service document using its ID
        const donationRef = doc(db, "donations", donationId);  // Assuming your collection is named "services"

        // Update the document to add the "assignedTo" field
        await updateDoc(donationRef, {
            assignedTo: assignedTo, // Add the new field
        });

        console.log("Service assigned successfully!");
    } catch (error) {
        console.error("Error assigning service:", error);
    }
}

export async function getDonationsAssignedToUser(username) {
    const donationsCollection = collection(db, "donations");
    
    // Create a query to find services where assignedTo equals the given username
    const donationsQuery = query(donationsCollection, where("assignedTo", "==", username));
    
    try {
        const querySnapshot = await getDocs(donationsQuery);
        
        if (querySnapshot.empty) {
            console.log("No donations found assigned to this user.");
            return [];
        } else {
            const donations = [];
            querySnapshot.forEach(doc => {
                donations.push({ id: doc.id, ...doc.data() });
            });
            return donations;
        }
    } catch (error) {
        console.error("Error getting donations:", error);
        return [];
    }
}

export async function getDonationsFromUser(username) {
    const donationsCollection = collection(db, "donations");
    
    // Create a query to find services where assignedTo equals the given username
    const donationsQuery = query(donationsCollection, where("donator", "==", username));
    
    try {
        const querySnapshot = await getDocs(donationsQuery);
        
        if (querySnapshot.empty) {
            console.log("No services found requested to this user.");
            return [];
        } else {
            const donations = [];
            querySnapshot.forEach(doc => {
                donations.push({ id: doc.id, ...doc.data() });
            });
            return donations;
        }
    } catch (error) {
        console.error("Error getting donations:", error);
        return [];
    }
}