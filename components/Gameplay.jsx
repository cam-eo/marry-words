import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";

import { Text } from "./Text";
import { TextInput } from "./TextInput";

export default function Gameplay({ navigation }) {
  const myTurn = true;
  const waitingForWord = false;
  // const myTurnComplete = false;
  const [myTurnComplete, setMyTurnComplete] = useState(false);

  const countDownDate = new Date() - 60 * 1000;

  // console.log("countDownDate: ", countDownDate.toISOString());

  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      {myTurn ? (
        <>
          {myTurnComplete ? (
            <>
              <Text style={styles.typeography}>Timeout</Text>
              <Text style={styles.typeography}>
                Waiting for peeps to select a word
              </Text>
              <Text style={styles.typeography}>Results are in</Text>
              <View style={{ backgroundColor: "#123459" }}>
                <Text style={styles.typeography}>Word</Text>
                <Text style={styles.typeography}>Player Name</Text>
              </View>
              <View style={{ backgroundColor: "#123459" }}>
                <Text style={styles.typeography}>Word</Text>
                <Text style={styles.typeography}>Player Name</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.typeography}>Timeout</Text>
              <Text style={styles.typeography}>
                Type a word or press the button
              </Text>
              <TextInput />
              <TouchableOpacity style={styles.button}>
                Generate a word
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setMyTurnComplete(true)}
                style={styles.button}
              >
                Submit
              </TouchableOpacity>
            </>
          )}
        </>
      ) : (
        <View>
          {waitingForWord ? (
            <>
              <Text style={styles.typeography}>
                Waiting for Shandre to select a word
              </Text>
              <Text style={styles.typeography}>Timeout</Text>
            </>
          ) : (
            <>
              <Text style={styles.typeography}>
                Waiting for Shandre to select a workd
              </Text>
              <Text style={styles.typeography}>Timeout</Text>
            </>
          )}
        </View>
      )}
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
  button: {
    backgroundColor: "#123456",
  },
  typeography: {
    color: "#FFF",
  },
  input: {},
});

// Idea: Pick a winner and loser or only winner? maybe a setting
