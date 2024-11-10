import {
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useEffect, useState, useRef, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Card, Title, Paragraph, FAB } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  getServicesAssignedToUser,
  getServicesRequestedByUser,
  getDonationsFromUser,
  getDonationsAssignedToUser,
  removeDonation,
  updateDonation,
  removeService,
  updateService,
} from "../ORM";
import UserContext from "../contexts/UserContext";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon

const firebaseConfig = {
  apiKey: "AIzaSyBjlA_pGLOeocLz0I9vSsX8vNdOqPFTyIM",
  authDomain: "timebank-8d18c.firebaseapp.com",
  projectId: "timebank-8d18c",
  storageBucket: "timebank-8d18c.firebasestorage.app",
  messagingSenderId: "722549859113",
  appId: "1:722549859113:web:83b666be8dfbd881680d38",
  measurementId: "G-FQKP8VC22C",
};

function SignedUp(props) {
  const [requests, setRequests] = useState([]);
  const [signedUp, setSignedUp] = useState([]);
  const [donations, setDonations] = useState([]);
  const [pickups, setPickups] = useState([]);
  const { usernameData, setUsernameData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onRefresh = () => {
    setLoading(true);
    getServicesAssignedToUser(usernameData).then((data) => setSignedUp(data));
    getServicesRequestedByUser(usernameData).then((data) => setRequests(data));
    getDonationsAssignedToUser(usernameData).then((data) => setPickups(data));
    getDonationsFromUser(usernameData).then((data) =>
      setDonations(data)
    );
    setLoading(false);
  };

  useEffect(() => {
    getServicesAssignedToUser(usernameData).then((data) => setSignedUp(data));
    getServicesRequestedByUser(usernameData).then((data) => setRequests(data));
    getDonationsAssignedToUser(usernameData).then((data) => setPickups(data));
    getDonationsFromUser(usernameData).then((data) =>
      setDonations(data)
    );
  }, []);

  function doUpdateDonation(donation) {
    const { assignedTo, ...donationWithoutAssignedTo } = donation;
    updateDonation(donation.id, { ...donationWithoutAssignedTo }).then(onRefresh());
  }

  function doUpdateService(service) {
    const { assignedTo, ...serviceWithoutAssignedTo } = service;
    updateService(service.id, { ...serviceWithoutAssignedTo }).then(onRefresh());
  }

  function completedService(service) {
    navigation.push("Completed", {
        ...service
    });
  }

  return (
    <View style={{ flex: 1, width: "100%", backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1 }} refreshControl={ <RefreshControl refreshing={loading} onRefresh={onRefresh} /> }>
        <Text style={styles.category}>
          Service requests {usernameData} made:
        </Text>
        {requests.length > 0 ? (
          requests.map((request) => {
            return (
              <Card style={{ backgroundColor: "white", margin: 10 }} key={request.id} >
                <Card.Content>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                      <Title>{request.title}</Title>
                      <Paragraph>{request.location}</Paragraph>
                      <Paragraph>Points: {request.points}</Paragraph>
                      {request.assignedTo != null ? (
                        <Paragraph>
                          Request accepted by user {request.assignedTo}. Contact
                          them at TODO
                        </Paragraph>
                      ) : (
                        <Paragraph>
                          No one has signed up for this request yet.
                        </Paragraph>
                      )}
                    <Text>
                        {request.description}
                    </Text>

                    </View>

                    {/* Trash can icon */}
                    <TouchableOpacity onPress={() => removeService(request.id).then(onRefresh())}>
                      <Icon name="delete" size={30} color="red" />
                    </TouchableOpacity>
                  </View>
                </Card.Content>
              </Card>
            );
          })
        ) : (
          <Text style={{ textAlign: "center", margin: 10 }}>
            No requests made
          </Text>
        )}
        <Text style={styles.category}>
          Services {usernameData} signed up for:
        </Text>
        {signedUp.length > 0 ? (
          signedUp.map((signed) => (
            <Card
              style={{ backgroundColor: "white", margin: 10 }}
              key={signed.id}
            >
              <Card.Content>
                <Title>{signed.title}</Title>
                <Paragraph>{signed.location}</Paragraph>
                <Paragraph>Points: {signed.points}</Paragraph>
                <Paragraph>Request made by {signed.requester}</Paragraph>
                <Paragraph>{signed.description}</Paragraph>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => completedService(signed)}
                  >
                    <Text style={styles.buttonText}>Completed</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonRed}
                    onPress={() => doUpdateService(signed)}
                  >
                    <Text style={styles.buttonText}>Drop Service</Text>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={{ textAlign: "center", margin: 10 }}>
            No events signed up for
          </Text>
        )}

        <Text style={styles.category}>{usernameData}'s Donations:</Text>
        {donations.length > 0 ? (
          donations.map((donation) => (
            <Card
              style={{ backgroundColor: "white", margin: 10 }}
              key={donation.id}
            >
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Title>{donation.title}</Title>
                    <Paragraph>{donation.location}</Paragraph>
                    <Paragraph>{donation.description}</Paragraph>
                    {donation.assignedTo != null ? (
                        <Paragraph>
                          Request accepted by user {donation.assignedTo}. Contact
                          them at TODO
                        </Paragraph>
                      ) : (
                        <Paragraph>
                          No one has signed up for this request yet.
                        </Paragraph>
                      )}
                  </View>
                  {/* Trash can icon for deletion */}
                  <TouchableOpacity onPress={() => removeDonation(donation.id).then(onRefresh())}>
                    <Icon name="delete" size={30} color="red" />
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={{ textAlign: "center", margin: 10 }}>
            No donations made
          </Text>
        )}

        <Text style={styles.category}>Donations to be picked up:</Text>
        {pickups.length > 0 ? (
          pickups.map((pickup) => (
              <Card
              style={{ backgroundColor: "white", margin: 10 }}
              key={pickup.id}
            >
              <Card.Content>
                <Title>{pickup.title}</Title>
                <Paragraph>{pickup.location}</Paragraph>
                <Paragraph>Donated by {pickup.donator}</Paragraph>
                <Paragraph>{pickup.description}</Paragraph>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => completedPickup(pickup)}
                  >
                    <Text style={styles.buttonText}>Completed</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonRed}
                    onPress={() => doUpdateDonation(pickup)}
                  >
                    <Text style={styles.buttonText}>Drop Pickup</Text>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={{ textAlign: "center", margin: 10 }}>
            No donations to pick up
          </Text>
        )}
      </ScrollView>
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
    backgroundColor: "#4361ee",
  },
  category: {
    textAlign: "center",
    alignContent: "center",
    fontSize: 18,
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row", // Aligns buttons in a row
    justifyContent: "space-between", // Adds space between buttons
    marginTop: 10,
  },
  button: {
    backgroundColor: "#4361ee", // Button background color
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    flex: 1, // Makes button take up available space
    marginRight: 5, // Adds spacing between buttons
  },
  buttonRed: {
    backgroundColor: "#e63946", // Different background color for red button
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SignedUp;
