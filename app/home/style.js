import { StyleSheet } from "react-native";
import { wp, hp } from "../../constants/device";
import { colors } from "../../constants/colors";

export default style = StyleSheet.create({
  homeBackground: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  homeCurvedBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: "none",
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: wp(8),
    fontFamily: "Nunito-Bold",
    color: colors.black,
    marginLeft: wp(5),
    marginBottom: wp(1),
  },

  homeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
