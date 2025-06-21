import { StyleSheet, Platform } from "react-native";
import { wp, hp } from "../../constants/device";
import { colors } from "../../constants/colors";

const IOS = Platform.OS === "ios";

export default style = StyleSheet.create({
  scanContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5F5F8",
  },

  titleContainer: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
    backgroundColor: colors.main,
    paddingVertical: hp(5),
  },
  titleIcon: {
    zIndex: 1,
    width: IOS ? wp(17) : wp(8),
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
    color: colors.white,
    textAlign: "center",
    width: "100%",
  },

  noPermissionText: {
    fontSize: wp(8),
    color: colors.black,
    textAlign: "center",
  },
  noPermissionTextHighlight: {
    fontSize: wp(8),
    color: colors.main,
    textAlign: "center",
  },

  cameraContainer: {
    flex: 1,
    width: "100%",
  },

  scannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  scannerFrame: {
    width: wp(70),
    height: wp(70),
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: wp(2),
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  scannerHelpText: {
    marginTop: hp(3),
    color: colors.white,
    fontSize: wp(4),
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: wp(2),
    borderRadius: wp(1),
  },

  rescanButton: {
    position: "absolute",
    bottom: hp(8),
    alignSelf: "center",
    backgroundColor: colors.main,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
  },

  rescanButtonText: {
    color: colors.white,
    fontSize: wp(4),
    fontFamily: "Nunito-Bold",
  },

  selectOrderContainer: {
    flex: 1,
    marginTop: hp(5),
    paddingHorizontal: wp(5),
  },
  selectTitle: {
    fontSize: wp(7),
    fontFamily: "Nunito-Bold",
    marginBottom: hp(5),
    textAlign: "center",
    color: colors.black,
  },

  selectOrderContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: wp(5),
  },

  selectTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: wp(5),
    color: colors.black,
    marginVertical: hp(3),
    textAlign: "center",
  },

  ordersScrollContainer: {
    width: "100%",
    marginBottom: hp(25.5),
  },
  orderItemContainer: {
    backgroundColor: colors.white,
    borderRadius: wp(2),
    padding: wp(4),
    marginBottom: hp(1.5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray,
  },
  orderItemSelected: {
    borderColor: colors.main,
    backgroundColor: colors.blueBackground,
  },
  orderItemContent: {
    flex: 1,
  },
  orderItemTitle: {
    fontFamily: "Nunito-Bold",
    color: colors.main,
    fontSize: wp(4),
    marginBottom: hp(0.5),
  },
  orderItemDetails: {
    flexDirection: "row",
    gap: wp(4),
  },
  orderItemDetail: {
    color: colors.gray,
    fontSize: wp(3.8),
  },
  orderItemCheck: {
    marginLeft: wp(2),
  },

  emptyStateContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(10),
    marginTop: hp(10),
  },
  emptyStateText: {
    fontFamily: "Nunito-Regular",
    fontSize: wp(4),
    color: colors.gray,
    textAlign: "center",
  },

  paginationContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: hp(18),
    alignSelf: "center",
  },
  pageButton: {
    minWidth: wp(10),
    marginHorizontal: wp(0.5),
  },
  ellipsis: {
    fontSize: wp(4),
    marginHorizontal: wp(1),
    color: colors.main,
  },

  confirmButton: {
    height: hp(6),
    width: wp(70),
    justifyContent: "center",
    position: "absolute",
    bottom: hp(8),
    alignSelf: "center",
  },
  confirmButtonContent: {
    height: "100%",
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: wp(4.5),
  },

  alertContainer: {
    borderRadius: wp(4),
    padding: wp(4),
    backgroundColor: colors.white,
  },
  alertTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: wp(5),
  },
  alertTitleSuccess: {
    color: colors.main,
  },
  alertTitleError: {
    color: colors.red,
  },
  alertText: {
    fontSize: wp(4),
    marginVertical: hp(1),
  },
  alertTextSuccess: {
    color: colors.main,
  },
  alertTextError: {
    color: colors.red,
  },
  alertButton: {
    marginRight: wp(4),
    backgroundColor: colors.white,
    height: hp(6),
    width: wp(22),
    justifyContent: "center",
  },
  alertButtonSuccess: {
    backgroundColor: colors.main,
  },
  alertButtonError: {
    backgroundColor: colors.red,
  },
  alertButtonContent: {
    height: "100%",
  },
  alertButtonText: {
    fontSize: wp(4.5),
    color: colors.white,
  },
});
