import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import { MenuModal } from "./menuModal";
import { UserModal } from "./userModal";

import LogoWhite from "../assets/images/logo-white.svg";
import { colors } from "../constants/colors";
import { wp, hp } from "../constants/device";

export function Navbar({ onSearchChange, searchQuery, activeRoute }) {
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const routesWithoutSearch = ["home", "myAccount"];
  const shouldShowSearch = !routesWithoutSearch.includes(activeRoute);
  const router = useRouter();

  const toggleMenuModal = () => {
    setMenuModalVisible(!menuModalVisible);
  };

  const toggleUserModal = () => {
    setUserModalVisible(!userModalVisible);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <TouchableOpacity onPress={() => router.push("home")}>
          <View style={styles.logoContainer}>
            <LogoWhite width="100%" height="100%" />
          </View>
        </TouchableOpacity>

        <View style={styles.iconsContainer}>
          <Appbar.Action
            icon={userModalVisible ? "close" : "account"}
            onPress={toggleUserModal}
            color={colors.white}
            size={wp(7)}
            style={styles.icon}
          />
          <Appbar.Action
            icon={menuModalVisible ? "close" : "menu"}
            onPress={toggleMenuModal}
            color={colors.white}
            size={wp(6)}
            style={styles.icon}
          />
        </View>
      </Appbar.Header>

      {shouldShowSearch && (
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
      )}

      <UserModal
        visible={userModalVisible}
        onDismiss={toggleUserModal}
        activeRoute={activeRoute}
      />

      <MenuModal
        visible={menuModalVisible}
        onDismiss={toggleMenuModal}
        activeRoute={activeRoute}
      />
    </View>
  );
}

const IOS = Platform.OS === "ios";
const styles = StyleSheet.create({
  container: {
    width: wp(100),
    paddingBottom: IOS ? hp(3) : hp(6),
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
    textAlign: "auto",
  },
  searchInput: {
    color: colors.black,
    fontSize: wp(4),
    minHeight: 0,
  },
});
