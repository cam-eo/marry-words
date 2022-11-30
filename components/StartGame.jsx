import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function StartGame({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Share this code with your friends</Text>
      <Text>---CODE---</Text>
      <Text>Players:</Text>
      <Text>Shandre</Text>
      <Text>Roche</Text>
      <Text>Mendes</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Gameplay")}
      >
        START
      </TouchableOpacity>
    </View>
  );
}

// once clicking on start, randomize order of names (maybe use context for this)

//Idea: ::Settings:: waiting time -slider-, penalty for taking too long -toggle-on-off-, character limit, hide turn-holder's name -toggle-on-off-, Show names on answers - toggle-on-off-

// show everyones score after each round?
// select number of rounds each?
// Allow anyone to end the game or just the person that started it?
// Help feature for people that have to find marriage words?
// Setting to allow the limits on the word? Character limit? or one word only?

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
    backgroundColor: "#123456",
  },
  typeography: {
    color: "#FFF",
  },
  input: {
    backgroundColor: "#FFF",
  },
});
