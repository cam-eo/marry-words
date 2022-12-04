import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";

import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { db } from "../firebase";

export default function Gameplay({ navigation }) {
  const myTurn = true;
  const waitingForWord = false;
  const [myTurnComplete, setMyTurnComplete] = useState(false);

  const countDownDate = new Date() - 60 * 1000;

  useEffect(() => {
    // get the dealer:
    // if dealer is me, set myTurn to true
    //
    // -- MY TURN --
    // Choose a word and start timeout
    // Update choosen word on tb
    // If timeout -- MY TURN OVER
    // Wait for everyone's response
    // Once everyone's response is there marryWords.length = players.length - 1
    // Select a winner - timeout
    // if TIMEOUT on SELECTION
    // Only a looser this round (Dealer struck a blank) - RED NOTICE - Dealer took too long to choose a winner
    // if Winner selected
    // store winner: player-uid in the db, and add score to winner
    // Show winner screen + timeout
    // On clicking Go to next round (or timoeut) ->
    //      if its my turn - wordInPlay = null, winner = null set next dealer,
    //      if its not my turn - remove my key from marryWords
    // GO TO WAITING ROOM FOR NEXT ROUND- listen for marryWords until marryWords is empty and winner is null (do initial check of marryWords object)
    // -- GO TO Gameplay
    //
    // -- MY TURN OVER
    // GET ID OF player key + 1 (or index 0 if key + 1 = player.keys.length - 1)
    // Set the key of that player id in dealer
    // initiate next round
    //
    // -- NOY MY TURN --
    // Wait for dealer to choose the word
    // Listen for wordInPlay for that user
    // Once word is available start timeout
    // Submit word (submit empty string if timeout)
    // Waiting for a winner - listen for winner
    // Show winner screen + timeout
    //
  }, []);

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
