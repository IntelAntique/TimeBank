import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons'; // Import the icon library
import Profile from "./Profile";

function ProfileIcon(props) {
    const navigation = useNavigation();

    return <Pressable onPress={() => navigation.navigate('Profile')}>
        {/* <MaterialCommunityIcons name="profile" size={24} color="white" style={{ marginRight: 15 }} /> */}
        <Ionicons name="person-circle" size={30} color="white" style={{ marginRight: 15 }}/>
    </Pressable>
}

export default ProfileIcon;