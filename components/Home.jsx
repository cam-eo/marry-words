import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.typeography}>Marry Words</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("StartGame")}
        style={styles.button}
      >
        Start Game
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("JoinGame")}
        style={styles.button}
      >
        Join Game
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE3EA",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "200px",
    width: "100%",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#465979",
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
  },
});
