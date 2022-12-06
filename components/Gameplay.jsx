import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";

import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { db } from "../firebase";
import { Button } from "./Button";
import { useStoreValue } from "../store";

import { ref, child, get, update, onValue } from "firebase/database";

export default function Gameplay({ navigation }) {
  const [myTurn, setMyTurn] = useState(null);
  const [state, dispatch] = useStoreValue();

  const countDownDate = new Date() - 60 * 1000;

  const [word, setWord] = useState("");

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
    // const playersRef = ref(db, `sessions/${state.sessionId}/players/${dealer}/wordInPlay`);
    // onValue(playersRef, (playersResponse) => {
    //   setWordToMarry(playersResponse.val());
    // });
    //
    // -------------------------------------------------------------
    //
    // let updateSession = {};
    // updateSession[`sessions/${sessionId}/players/${user.uid}`] = {
    //   name,
    // };
    //
    // update(dbRef, updateSession).then(() => {
    //   onDisconnect(userToSessionRef).remove();
    //   navigation.navigate("WaitingToStart");
    // });

    const dbRef = ref(db);
    get(child(dbRef, `sessions/${state.sessionId}`)).then((res) => {
      dispatch({
        type: "SET_GAMEPLAY",
        dealer: {
          uid: res.val().dealer,
          name: res.val().players[res.val().dealer].name,
        },
        players: res.val().players,
      });

      if (state.user.uid === res.val().dealer) {
        setMyTurn(true);
      }

      if (!myTurn) {
        const dealerWordRef = ref(
          db,
          `sessions/${state.sessionId}/players/${res.val().dealer}/wordInPlay`
        );
        onValue(dealerWordRef, (dealerWordResponse) => {
          dispatch({
            type: "SET_WORD_IN_PLAY",
            wordInPlay: dealerWordResponse.val(),
          });

          if (dealerWordResponse.val()) {
            navigation.navigate("MarryAWord");
          }
        });
      }
    });

    // LISTEN FOR WORD
  }, []);

  function submit() {
    //
    setWord("");

    let updateSession = {};
    updateSession[
      `sessions/${state.sessionId}/players/${state.user.uid}/wordInPlay`
    ] = word;

    const dbRef = ref(db);

    update(dbRef, updateSession).then(() => {
      navigation.navigate("PickAWinner");
    });
  }

  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      {myTurn && setMyTurn ? (
        <>
          <Text style={styles.typeography}>Type in a word</Text>
          <TextInput
            styles={{
              width: "100%",
              maxWidth: 300,
              fontSize: 24,
              padding: 8,
              color: "#FFF",
              textAlign: "center",
              marginBottom: 24,
            }}
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <Button onPress={submit}>Submit</Button>
        </>
      ) : (
        <>
          {state.dealer.name ? (
            <Text style={styles.typeography}>
              {`Waiting for ${state.dealer.name} to select a word`}
            </Text>
          ) : null}
        </>
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
    fontSize: 24,
  },
  input: {},
});

// Idea: Pick a winner and loser or only winner? maybe a setting
