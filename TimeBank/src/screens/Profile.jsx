import React from "react";
import { View, Text, Pressable, Image, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const width = Dimensions.get("window").width * 0.3;

const MenuItem = ({ icon, title, hasChevron = true, onPress }) => (
    <Pressable 
      style={styles.menuItem} 
      onPress={onPress}
    >
      <View style={styles.menuItemContent}>
        <Ionicons name={icon} size={24} color="#666" />
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      {hasChevron && <Ionicons name="chevron-forward" size={24} color="#666" />}
    </Pressable>
  );

function Profile(props) {

    return <SafeAreaView style={styles.container}>
        <View style={styles.content}>
            <View style={styles.profileSection}>
                <Image 
                style={styles.picture} 
                source={{ uri: "https://media.licdn.com/dms/image/v2/D5603AQHTiFSZIO3JbQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724477985031?e=1736985600&v=beta&t=xFvROqYnJRlKL0jKYwDzX4B1tYq7kr1rq20BrlS6gKM" }} 
                />
                <Pressable style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
                </Pressable>

                <Text>Username</Text>
                <Text>@username</Text>
            </View>

            <View style={styles.menuSection}>
                <MenuItem icon="settings-outline" title="Settings" />
                <MenuItem icon="document-text-outline" title="My Orders" />
                <MenuItem icon="location-outline" title="Address" />
                <MenuItem icon="lock-closed-outline" title="Change Password" />
                <MenuItem icon="help-circle-outline" title="Help & Support" />
                <MenuItem 
                    icon="log-out-outline" 
                    title="Log out" 
                    hasChevron={false}
                />
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
      backgroundColor: '#fff',
    },
    content: {
      flex: 1,
    },
    profileSection: {
      alignItems: 'center',
      padding: 20,
    },
    picture: {
      width: width,
      height: width,
      borderRadius: width / 2,
      marginBottom: 15,
    },
    editButton: {
      backgroundColor: '#000',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
    },
    editButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    menuSection: {
      paddingHorizontal: 15,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    menuItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuItemText: {
      fontSize: 16,
      marginLeft: 15,
      color: '#333',
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#f0f0f0',
      backgroundColor: '#fff',
    },
    navItem: {
      padding: 10,
    },
  });

export default Profile;