import { Platform, StyleSheet } from "react-native";
import { wp, hp } from "../../constants/device";
import { colors } from "../../constants/colors";

const IOS = Platform.OS === "ios";
export default style = StyleSheet.create({
  homeBackground: {
    width: IOS ? wp(50) : wp(100),
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
    fontWeight: "bold",
    color: colors.black,
    marginLeft: wp(5),
    marginBottom: wp(1),
  },

  homeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
