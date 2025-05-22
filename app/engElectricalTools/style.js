import { StyleSheet } from "react-native";
import { wp, hp } from "../../constants/device";
import { colors } from "../../constants/colors";

export default style = StyleSheet.create({
  itemsBackground: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  itemsCurvedBackground: {
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

  itemsContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: hp(4),
  },
  itemsLoad: {
    marginTop: hp(20),
  },

  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: wp(100),
    paddingRight: wp(4),
    marginVertical: hp(0.5),
  },

  tableContainer: {
    marginHorizontal: wp(5),
    marginBottom: hp(2),
    borderRadius: wp(3),
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flex: 1,
    flexGrow: 0,
  },
  table: {
    width: wp(150),
    backgroundColor: "white",
    borderRadius: wp(3),
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  headerCell1: {
    justifyContent: "center",
    maxWidth: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  cell1: {
    justifyContent: "center",
    maxWidth: wp(4),
  },
  headerCell: {
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  cell: {
    justifyContent: "center",
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
});
