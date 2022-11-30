import { StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Text } from "./Text";
import { colors } from "../theme";

export default function Home({ navigation }) {
  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <Text style={styles.typeography}>Marry Words</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("StartGame")}
        style={styles.button}
      >
        <Text weight="Bold" styles={styles.typeography}>
          Start Game
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("JoinGame")}
        style={styles.button}
      >
        <Text weight="Bold" styles={styles.typeography}>
          Join Game
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFE3EA",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "200px",
    width: "100%",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    width: 200,
    maxHeight: 100,
    marginBottom: 12,
    borderRadius: 16,
    color: "#FFF",
  },
  typeography: {
    color: "#FFF",
    fontSize: 20,
  },
});
