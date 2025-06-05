import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import {
  Modal,
  Portal,
  Text,
  List,
  Divider,
  TouchableRipple,
  IconButton,
} from "react-native-paper";
import { UseUser } from "../hooks/userContext";
import { wp, hp } from "../constants/device";
import { colors } from "../constants/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function UserModal({ visible, onDismiss, activeRoute }) {
  const { user, logout } = UseUser();
  const router = useRouter();

  const menuItems = [
    {
      title: "Mi Perfil",
      icon: "account",
      route: "myAccount",
    },
    {
      title: "Cerrar Sesión",
      icon: "logout",
      isLogout: true,
    },
  ];

  const isActive = (route) => {
    if (activeRoute === route) return true;

    return false;
  };

  const handleItemPress = (item) => {
    if (item.isLogout) {
      logout();
      onDismiss();
      router.replace("/login");
    } else if (item.route) {
      router.push(item.route);
      onDismiss();
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={style.modalContainer}
        theme={{ colors: { backdrop: "transparent" } }}
      >
        <View style={style.modal}>
          <View style={style.container}>
            <View style={style.titleContainer}>
              <IconButton
                icon="account-circle"
                iconColor={colors.black}
                size={wp(14)}
                style={style.titleIcon}
              />
              <View style={style.titleCenterContainer}>
                <Text style={style.titleText}>{user?.full_name}</Text>
                <Text style={style.titleSubText}>{user?.groups}</Text>
              </View>
            </View>

            <Divider style={style.divider} />

            <View style={style.scrollContainer}>
              <List.Section style={style.listSection}>
                {menuItems.map((item) => {
                  const isItemActive = isActive(item.route);

                  return (
                    <React.Fragment key={item.title}>
                      <TouchableRipple
                        onPress={() => handleItemPress(item)}
                        style={[style.item, isItemActive && style.activeItem]}
                        rippleColor={item.isLogout ? colors.red : colors.main}
                        borderless={true}
                      >
                        <View style={style.itemContent}>
                          <MaterialCommunityIcons
                            name={item.icon}
                            color={
                              item.isLogout
                                ? colors.red
                                : isItemActive
                                ? colors.white
                                : colors.gray
                            }
                            size={wp(6)}
                          />

                          <Text
                            style={[
                              style.itemText,
                              isItemActive && style.activeText,
                              item.isLogout && style.logoutText,
                            ]}
                          >
                            {item.title}
                          </Text>
                        </View>
                      </TouchableRipple>
                    </React.Fragment>
                  );
                })}
              </List.Section>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const IOS = Platform.OS === "ios";
const style = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    bottom: IOS ? hp(0) : hp(3),
    left: 0,
    right: 0,
    alignItems: "center",
  },
  modal: {
    backgroundColor: colors.white,
    width: wp(92),
    height: IOS ? hp(70) : hp(72),
    borderRadius: wp(3),
  },
  container: {
    padding: wp(4),
  },

  titleContainer: {
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
  },
  titleIcon: {
    position: "absolute",
    left: 0,
    zIndex: 1,
  },
  titleCenterContainer: {
    marginLeft: wp(20),
  },
  titleText: {
    fontSize: wp(8),
    fontFamily: "Nunito-Bold",
    color: colors.black,
  },
  titleSubText: {
    fontSize: wp(5),
    color: colors.black,
  },

  divider: {
    marginVertical: hp(1),
    backgroundColor: colors.main,
  },

  item: {
    marginBottom: hp(4),
    paddingHorizontal: wp(3),
    borderRadius: wp(2),
  },
  activeItem: {
    backgroundColor: colors.main,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    height: hp(5),
  },
  itemText: {
    fontSize: wp(4.5),
    flex: 1,
    marginLeft: wp(5),
    color: colors.gray,
  },
  activeText: {
    color: colors.white,
  },
  logoutText: {
    color: colors.red,
  },
});
