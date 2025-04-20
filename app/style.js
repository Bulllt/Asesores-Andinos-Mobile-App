import { StyleSheet } from "react-native";
import { wp, hp } from "../constants/device";
import { colors } from "../constants/colors";

export const style = StyleSheet.create({
  welcomeBackground: {
    flex: 1,
    width: wp(100),
    height: hp(100),
  },

  welcomeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: hp(10),
  },

  welcomeLogo: {
    width: wp(60),
    height: hp(20),
  },

  welcomeTitle: {
    fontSize: wp(10),
    color: colors.white,
    fontWeight: "bold",
  },

  welcomeButton: {
    backgroundColor: colors.main,
    paddingHorizontal: wp(25),
    paddingVertical: hp(2.5),
    borderRadius: wp(8),
  },
  welcomeButtonText: {
    color: colors.white,
    fontSize: wp(4.5),
  },
});
