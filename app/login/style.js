import { StyleSheet } from "react-native";
import { wp, hp } from "../../constants/device";
import { colors } from "../../constants/colors";

export default style = StyleSheet.create({
  loginBackground: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  loginCurvedBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: "none",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },

  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: hp(5),
  },

  loginLogo: {
    width: wp(50),
    height: hp(18),
    marginBottom: hp(5),
    paddingTop: hp(2),
    zIndex: 1,
  },

  loginForm: {
    width: wp(90),
    backgroundColor: colors.white,
    borderRadius: wp(5),
    paddingHorizontal: wp(8),
    paddingBottom: hp(4),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },

  formTitle: {
    fontSize: wp(6),
    color: colors.main,
    fontFamily: "Nunito-Bold",
    textAlign: "center",
    marginVertical: hp(4),
  },

  formInput: {
    marginBottom: hp(3),
    height: hp(6),
    fontSize: wp(4),
    paddingLeft: wp(7),
  },
  formError: {
    color: colors.red,
    fontSize: wp(3),
    marginTop: -hp(2),
    marginBottom: hp(1),
    marginLeft: wp(4),
    height: hp(2),
  },

  formCheckContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(3),
    color: colors.main,
  },
  formCheckText: {
    marginLeft: wp(2),
    color: colors.black,
  },

  formButton: {
    height: hp(6),
    justifyContent: "center",
    marginBottom: hp(3),
    borderRadius: wp(3),
  },
  formButtonContent: {
    height: "100%",
  },
  formButtonText: {
    color: colors.white,
    fontSize: wp(4),
    fontFamily: "Nunito-Bold",
  },

  formText: {
    textAlign: "center",
    color: colors.black,
    marginBottom: hp(1),
  },
  formRefText: {
    color: colors.main,
    fontFamily: "Nunito-Bold",
  },

  snackbar: {
    marginBottom: hp(5),
  },
  snackbarText: {
    fontSize: wp(4),
    color: colors.white,
  },
  snackbarSuccess: {
    backgroundColor: colors.main,
  },
  snackbarError: {
    backgroundColor: colors.redError,
  },
});
