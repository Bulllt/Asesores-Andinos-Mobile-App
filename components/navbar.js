import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Searchbar, useTheme } from "react-native-paper";

import LogoWhite from "../assets/images/logo-white.svg";
import { colors } from "../constants/colors";
import { wp, hp } from "../constants/device";

export function Navbar({ onSearchChange, searchQuery }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={styles.appBar}
        theme={{ colors: { primary: colors.main } }}
      >
        <View style={styles.logoContainer}>
          <LogoWhite width="100%" height="100%" />
        </View>

        <View style={styles.iconsContainer}>
          <Appbar.Action
            icon="account"
            onPress={() => console.log("User pressed")}
            color={colors.white}
            size={wp(7)}
            style={styles.icon}
          />
          <Appbar.Action
            icon="bell"
            onPress={() => console.log("Notifications pressed")}
            color={colors.white}
            size={wp(6)}
            style={styles.icon}
          />
          <Appbar.Action
            icon="menu"
            onPress={() => console.log("Menu pressed")}
            color={colors.white}
            size={wp(6)}
            style={styles.icon}
          />
        </View>
      </Appbar.Header>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="¿Qué estás buscando?"
          placeholderTextColor={colors.placeholder}
          iconColor={colors.placeholder}
          onChangeText={onSearchChange}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    paddingBottom: hp(1.5),
  },
  appBar: {
    backgroundColor: "transparent",
    elevation: 0,
    height: hp(8),
    justifyContent: "space-between",
    marginHorizontal: wp(4),
  },
  logoContainer: {
    width: wp(30),
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: wp(2),
  },
  searchContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
  },
  searchBar: {
    borderRadius: wp(6),
    height: hp(6),
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: colors.white,
  },
  searchInput: {
    color: colors.black,
    fontSize: wp(4),
    minHeight: 0,
  },
});
