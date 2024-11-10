import {
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useEffect, useState, useContext, useCallback } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Card, Title, Paragraph, FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { addService, getUserByUsername, updateUser } from "../ORM";
import UserContext from "../contexts/UserContext";
import * as ImagePicker from 'expo-image-picker';

const firebaseConfig = {
  apiKey: "AIzaSyBjlA_pGLOeocLz0I9vSsX8vNdOqPFTyIM",
  authDomain: "timebank-8d18c.firebaseapp.com",
  projectId: "timebank-8d18c",
  storageBucket: "timebank-8d18c.firebasestorage.app",
  messagingSenderId: "722549859113",
  appId: "1:722549859113:web:83b666be8dfbd881680d38",
  measurementId: "G-FQKP8VC22C",
};

function AddService(props) {
  props = props.route.params;
  const [serviceName, setServiceName] = useState("");
  const [serviceLocation, setServiceLocation] = useState("");
  const [serviceHours, setServiceHours] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [image, setImage] = useState(null); // To store the image URI

  const { usernameData, setUsernameData } = useContext(UserContext);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const navigation = useNavigation();

  async function chooseImage(){
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permission.status !== 'granted') {
        // If permission is not granted, ask for it
        const newPermission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        
        if (newPermission.status === 'granted') {
            // Open the camera roll if permission is granted
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaType: 'photo', // You can set it to 'photo' to pick images only, or 'any' for both images and videos
                base64: true, // If you want the image in base64 format
            });

            // Check if the user picked a photo or cancelled
            if (!response.cancelled && !response.errorCode) {
                const base64Image = response.base64;
                console.log(base64Image); 
                setImage(base64Image); 
            } else {
                console.log(response); // In case of cancellation or error
            }
        }
    } else {
        // If permission is already granted, open the camera roll
        const response = await ImagePicker.launchImageLibraryAsync({
            mediaType: 'photo',
            base64: true, 
        });

        // Check if the user picked a photo or cancelled
        if (!response.cancelled && !response.errorCode) {
            const base64Image = response.base64;
            console.log(base64Image); 
            setImage(base64Image); 
        } else {
            console.log(response); // In case of cancellation or error
        }
    }
}

  const insertService = async () => {
    try {
      // Wait for the user data to be fetched
      const data = await getUserByUsername(usernameData);

      // Check if the user has enough points
      if (data.points < serviceHours) {
        // Show alert if  user doesn't have enough points
        Alert.alert(
          "You do not have enough points to make this request", // Title of the alert
          "Get more points by doing services and donating items!", // Message
          [
            {
              text: "OK", // Button text
            },
          ],
          { cancelable: true } // This will prevent closing the alert by tapping outside
        );
        return; // Stop further execution if user doesn't have enough points
      } else {
        // Proceed with service creation if user has enough points
        let service = {
          description: serviceDescription,
          location: serviceLocation,
          points: serviceHours,
          requester: usernameData,
          title: serviceName,
          completed: false,
        };

        // Deduct points and update user data
        data.points = data.points - serviceHours;
        await updateUser(data.id, data); // Make sure this is awaited if it's async

        // Add service to the database
        await addService(service);

        // Reset the navigation to "Services" screen
        navigation.reset({
          index: 0, // The first screen after reset
          routes: [{ name: "Services" }], // Navigate to the "Services" screen
        });
      }
    } catch (error) {
      console.error("Error processing service request:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.page}>
        <View style={{ margin: 30, alignItems: "center" }}>
          <Text style={styles.label}>What service are you requesting?</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Mow the lawn"
            value={serviceName}
            onChangeText={setServiceName}
          />
          <Text style={styles.label}>
            What location is the service occurring at?
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the service location"
            value={serviceLocation}
            onChangeText={setServiceLocation}
          />

          <Text style={styles.label}>
            Approximately how many hours will this service take (used to
            determine number of points)?
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number of hours"
            value={serviceHours}
            keyboardType="numeric"
            onChangeText={setServiceHours}
          />

          <Text style={styles.label}>
            Please describe in detail what volunteers have to do to complete the
            service.
          </Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Enter the service description"
            value={serviceDescription}
            multiline={true}
            onChangeText={setServiceDescription}
          />
{/* 
          <Text style={styles.text}>Pick an image</Text>

          {image && (
            <Image source={{ uri: image }} style={styles.image} />
          )}

          <Button title="Choose Image" onPress={chooseImage} /> */}

          {/* TODO: Once log in logic is implemented, check that the user has enough points  */}
          <TouchableOpacity style={styles.button} onPress={insertService}>
            <Text style={styles.buttonText}>Add Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4361ee", // Set the button background color
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 300,
    borderRadius: 30, // Rounded corners
    marginTop: 30,
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
  },
  descriptionInput: {
    height: 100, // Larger height for the description input
    width: 300,
  },
});

export default AddService;
