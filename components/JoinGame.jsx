import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function JoinGame({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.typeography}>Enter the code to join a game</Text>
      <TextInput style={styles.input} />
      <Text style={styles.typeography}>What is your name?</Text>
      <TextInput style={styles.input} />
      <TouchableOpacity style={styles.button}>Join</TouchableOpacity>
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
  input: {
    backgroundColor: "#FFF",
  },
});
