import React from "react";
import { useRouter } from "expo-router";
import { View, Text, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import { UseUser } from "../hooks/userContext";

import style from "./style";
import LogoWhite from "../assets/images/logo-white.svg";

export default function WelcomeScreen() {
  const router = useRouter();
  const { user } = UseUser();

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

        <Button
          mode="contained"
          onPress={() => router.push(user ? "home" : "login")}
          style={style.welcomeButton}
          contentStyle={style.welcomeButtonContent}
          labelStyle={style.welcomeButtonText}
          icon={user ? "home" : "login"}
        >
          {user ? "INICIO" : "ACCEDER"}
        </Button>
      </View>
    </ImageBackground>
  );
}
