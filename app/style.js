import { StyleSheet } from "react-native";
import { wp, hp } from "../constants/device";
import { colors } from "../constants/colors";

export default style = StyleSheet.create({
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
    fontFamily: "Nunito-Bold",
  },

  welcomeButton: {
    height: hp(6),
    width: wp(70),
    justifyContent: "center",
  },
  welcomeButtonContent: {
    height: "100%",
  },
  welcomeButtonText: {
    color: colors.white,
    fontSize: wp(4.5),
  },
});
