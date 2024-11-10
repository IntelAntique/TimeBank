import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import UserContext from "../contexts/UserContext";
import { useEffect, useState, useRef, useContext } from "react";
import { getUserByUsername } from "../ORM";
import { Rating } from "react-native-ratings";

const width = Dimensions.get("window").width * 0.3;

const MenuItem = ({ icon, title, hasChevron = true, onPress }) => (
  <Pressable style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemContent}>
      <Ionicons name={icon} size={24} color="#666" />
      <Text style={styles.menuItemText}>{title}</Text>
    </View>
    {hasChevron && <Ionicons name="chevron-forward" size={24} color="#666" />}
  </Pressable>
);

function Profile(props) {
  const { usernameData, setUsernameData } = useContext(UserContext);
  const [points, setPoints] = useState(0);

  const getProfileInfo = async () => {
    try {
      // Wait for the user data to be fetched
      const data = await getUserByUsername(usernameData);
      setPoints(data.points);
    } catch (error) {
      console.error("Error processing service request:", error);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileSection}>
          <Image
            style={styles.picture}
            source={{
              uri: "https://media.licdn.com/dms/image/v2/D5603AQHTiFSZIO3JbQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724477985031?e=1736985600&v=beta&t=xFvROqYnJRlKL0jKYwDzX4B1tYq7kr1rq20BrlS6gKM",
            }}
          />
          <View style={{ margin: 10, textAlign: 'center', alignItems: 'center' }}>
            <Text>{usernameData}</Text>
            <Text>@{usernameData}</Text>
            <Text style={styles.pointsText}>Points: {points}</Text>
            <Rating
              type="star"
              ratingCount={5} // 5 stars
              imageSize={30} // Size of each star
              readonly // Set the rating as read-only
              startingValue={4} // Set the initial rating (between 0 and 5)
            />
          </View>

          <Pressable style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
        </View>

        <View style={styles.menuSection}>
          <MenuItem icon="settings-outline" title="Settings" />
          <MenuItem icon="document-text-outline" title="My Orders" />
          <MenuItem icon="location-outline" title="Address" />
          <MenuItem icon="lock-closed-outline" title="Change Password" />
          <MenuItem icon="help-circle-outline" title="Help & Support" />
          <MenuItem icon="log-out-outline" title="Log out" hasChevron={false} />
        </View>
      </View>

      {/* <View style={styles.bottomNav}>
            <Pressable style={styles.navItem}>
                <Ionicons name="home-outline" size={24} color="#000" />
            </Pressable>
            <Pressable style={styles.navItem}>
                <Ionicons name="heart-outline" size={24} color="#000" />
            </Pressable>
            <Pressable style={styles.navItem}>
                <Ionicons name="search-outline" size={24} color="#000" />
            </Pressable>
            <Pressable style={styles.navItem}>
                <Ionicons name="bag-outline" size={24} color="#000" />
            </Pressable>
            <Pressable style={styles.navItem}>
                <Ionicons name="person" size={24} color="#000" />
            </Pressable>
        </View> */}
    </SafeAreaView>
  );

  // <View>
  //     <View style={{margin: 20}} >
  //         <Image style={styles.picture} source={{ uri: "https://media.licdn.com/dms/image/v2/D5603AQHTiFSZIO3JbQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724477985031?e=1736985600&v=beta&t=xFvROqYnJRlKL0jKYwDzX4B1tYq7kr1rq20BrlS6gKM" }} />
  //         <Text>Profile</Text>

  //     </View>

  // </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  picture: {
    width: width,
    height: width,
    borderRadius: width / 2,
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: "#4361ee",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  menuSection: {
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  navItem: {
    padding: 10,
  },
  pointsText: {
    fontSize: 20, // Increase font size
    fontWeight: 'bold', // Make the text bold
    color: '#4361ee', // Use a standout color like Tomato (you can change it)
    textAlign: 'center', // Center align the text
    marginVertical: 10, // Add vertical margin to space out the text
    backgroundColor: '#e4e7f7', // Add a subtle background color (optional)
    padding: 5, // Add some padding around the text for emphasis
    borderRadius: 5, // Optional: rounded corners for the background
    shadowColor: '#000', // Optional: shadow for a lifted effect
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 2, // Shadow blur radius
  },
});

export default Profile;
