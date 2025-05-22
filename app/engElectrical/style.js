import { StyleSheet } from "react-native";
import { wp, hp } from "../../constants/device";
import { colors } from "../../constants/colors";

export default style = StyleSheet.create({
  hubBackground: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  hubCurvedBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: "none",
  },

 titleContainer: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
  },
  titleIcon: {
    zIndex: 1,
    width: wp(8),
  },
  titleCenterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: -wp(8),
  },

  titleText: {
    fontSize: wp(8),
    fontFamily: "Nunito-Bold",
    color: colors.black,
    textAlign: "center",
    width: "100%",
  },

  hubContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(5),
  },

  card: {
    borderRadius: wp(4),
    backgroundColor: colors.white,
    marginBottom: hp(5),
    width: wp(90),
    height: hp(10),
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: wp(6),
    color: colors.black,
    marginLeft: wp(4),
  },
});
