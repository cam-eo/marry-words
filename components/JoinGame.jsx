import { StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";

import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { Button } from "./Button";

export default function JoinGame({ navigation }) {
  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <Text styles={styles.typeography}>Enter the code to join a game</Text>
      <TextInput styles={styles.input} />
      <Text styles={styles.typeography}>What is your name?</Text>
      <TextInput styles={styles.input} />
      <Button
      // onPress={() => navigation.navigate("Gameplay")}
      >
        Join
      </Button>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: "200px",
    width: "100%",
  },
  typeography: {
    color: "#FFF",
  },
  input: {},
});
