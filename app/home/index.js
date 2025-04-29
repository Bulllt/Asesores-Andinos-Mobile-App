import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, ImageBackground } from "react-native";
import { IconButton } from "react-native-paper";
import { CurvedTop } from "../../components/curvedTop";
import { Navbar } from "../../components/navbar";

import style from "./style";

export default function ItemsScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/background.webp")}
        blurRadius={4}
        style={style.homeBackground}
      >
        <View style={style.homeCurvedBackground}>
          <CurvedTop color={"#F5F5F8"} width={100} height={90} depth={0.1} />
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

      <View style={style.homeContainer}></View>
    </View>
  );
}
