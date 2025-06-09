import { StyleSheet, Platform } from "react-native";
import { wp, hp } from "../../constants/device";
import { colors } from "../../constants/colors";

const IOS = Platform.OS === "ios";

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
    marginBottom: hp(3),
  },

  homeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },

  homeCard: {
    height: hp(18),
    width: wp(40),
    marginBottom: hp(6),
    borderRadius: wp(8),
    backgroundColor: colors.white,
    elevation: 3,
  },
  homeCardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  homeCardText: {
    fontFamily: "Nunito-Bold",
    fontSize: IOS ? wp(3.6) : wp(4),
    color: colors.main,
    marginTop: hp(3),
    textAlign: "center",
  },
});
