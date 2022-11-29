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
        onPress={() => navigation.navigate("Gameplay")}
        style={styles.button}
      >
        Start Game
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>Join Game</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "200px",
    width: "100%",
  },
  button: {
    backgroundColor: "#123456",
  },
  typeography: {
    color: "#FFF",
  },
});
