import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function ProfileIcon(props) {
    const navigation = useNavigation();

    return <Pressable onPress={() => navigation.navigate('Profile')}>
        <MaterialCommunityIcons name="account" size={24} color="white" style={{ marginRight: 15 }} />
    </Pressable>
}

export default ProfileIcon;