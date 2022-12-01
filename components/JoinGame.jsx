import { StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";

import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { Button } from "./Button";

export default function JoinGame({ navigation }) {
  function onSubmit() {
    // Add this user to the session

    // Error Message on no SessionId Available
    navigation.navigate("WaitingToStart");
  }

  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <Text styles={styles.typeography}>Enter the code to join a game</Text>
      <TextInput styles={styles.input} />
      <Text styles={styles.typeography}>What is your name?</Text>
      <TextInput styles={styles.input} />
      <Button onPress={onSubmit}>Join</Button>
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
