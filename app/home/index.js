import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from "react-native";
import { IconButton } from "react-native-paper";
import { CurvedTop } from "../../components/curvedTop";
import { Navbar } from "../../components/navbar";
import { UseUser } from "../../hooks/userContext";

import style from "./style";

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = UseUser();
  const IOS = Platform.OS === "ios";
  const height = IOS ? 86 : 90;

  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/background.webp")}
        blurRadius={4}
        style={style.homeBackground}
      >
        <View style={style.homeCurvedBackground}>
          <CurvedTop
            color={"#F5F5F8"}
            width={100}
            height={height}
            depth={0.1}
          />
        </View>
      </ImageBackground>

      <Navbar
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        activeRoute={"home"}
      />

      <View style={style.titleContainer}>
        <Text style={style.titleText}>Inicio</Text>
      </View>

      <View style={style.homeContainer}>
        <Text>RUT: {user?.rut}</Text>
        <Text>NAME: {user?.full_name}</Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
