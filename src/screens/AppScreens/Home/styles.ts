import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBg
  },
  loadingFooter: {
    justifyContent: "center",
    alignItems: "center"
  },
  scene: {
    flex: 1,
  },
});

export default styles;
