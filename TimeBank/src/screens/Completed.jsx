import {
  Text,
  View,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
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
import { updateService, updateDonation, updateUser, getUserByUsername } from "../ORM";
import UserContext from "../contexts/UserContext";
import { Rating } from "react-native-ratings";

function Completed(props) {
    const [rating, setRating] = useState(3);  // Set initial rating (0-5)
  const { usernameData, setUsernameData } = useContext(UserContext);

  props = props.route.params;

  const navigation = useNavigation();

  function submit() {
    if(props.donator){
       let newDonation = {
            description: props.description,
            location: props.location,
            points: props.points,
            donator: props.donator,
            photo: props.photo,
            title: props.title,
            completed: true
       }
       getUserByUsername(usernameData).then((data) => {
            data.points = parseInt(data.points, 10) + parseInt(props.points, 10);
            updateUser(data.id, data);
       })
        updateDonation(props.id, newDonation).then(navigation.reset({
            index: 0, // The first screen after reset
            routes: [{ name: 'SignedUp' }], // Navigate to the "Services" screen
        }))
    } else if(props.requester) {
        let newService = {
            description: props.description,
            location: props.location,
            points: props.points,
            requester: props.requester,
            title: props.title,
            completed: true
       }
       getUserByUsername(usernameData).then((data) => {
        data.points = parseInt(data.points, 10) + parseInt(props.points, 10);
        updateUser(data.id, data);
        })
        updateService(props.id, newService).then(navigation.reset({
            index: 0, // The first screen after reset
            routes: [{ name: 'SignedUp' }], // Navigate to the "Services" screen
        }))
    }
  }

  const handleRating = (newRating) => {
    setRating(newRating);  // Update rating on change
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.page}>
        <Text style={styles.text}>Rate {props.donator ? props.donator : props.requester}:</Text>
        <Rating
          type="star"
          ratingCount={5} // Number of stars
          imageSize={30} // Size of each star
          ratingColor="gold" // Color of filled stars
          ratingBackgroundColor="gray" // Color of empty stars
          startingValue={rating} // Starting rating value
          onFinishRating={handleRating} // Callback when rating is finished
        />
        <Text style={styles.ratingValue}>Rating: {rating}</Text>

        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    padding: 50,
  },
  inputWrapper: {
    width: 200, // Match the width of your input field
    alignItems: "flex-start", // Align label and input to the left
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    width: "100%", // Use full width of the inputWrapper
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: "#4361ee",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 300,
    borderRadius: 30,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  ratingValue: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default Completed;
