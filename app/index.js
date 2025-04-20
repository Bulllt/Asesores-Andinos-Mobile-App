import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";

import { style } from "./style";
import LogoWhite from "../assets/images/logo-white.svg";

export default function welcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/background.webp")}
      blurRadius={2}
      style={style.welcomeBackground}
    >
      <View style={style.welcomeContainer}>
        <View style={style.welcomeLogo}>
          <LogoWhite width="100%" height="100%" />
        </View>
        <Text style={style.welcomeTitle}>¡BIENVENIDO!</Text>
        <TouchableOpacity
          style={style.welcomeButton}
          onPress={() => router.push("login")}
        >
          <Text style={style.welcomeButtonText}>ACCEDER</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
