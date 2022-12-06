import type { FC } from "react";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";
import { StyleSheet } from "react-native";
import { Text } from "./Text";
import { Button } from "./Button";
import { useStoreValue } from "../store";
import { ref, child, get, update, onValue } from "firebase/database";
import { db } from "../firebase";

interface Props {}

export const PickAWinner: FC<Props> = ({ navigation }) => {
  const [readyToSelectWinner, setReadyToSelectWinner] = useState(false);
  const [state, dispatch] = useStoreValue();

  useEffect(() => {
    const playersRef = ref(db, `sessions/${state.sessionId}/marryWords`);
    onValue(playersRef, (marryWordsResponse) => {
      console.log("marryWordsResponse: ", marryWordsResponse.val());
      dispatch({
        type: "SET_MARRY_WORDS",
        marryWords: marryWordsResponse.val(),
      });

      const playerKeysLength = Object.keys(state.players).length - 1;
      const marryWordsKeysLength = marryWordsResponse.val()
        ? Object.keys(marryWordsResponse.val()).length
        : 0;

      if (marryWordsKeysLength === playerKeysLength) {
        setReadyToSelectWinner(true);
      }
    });
  }, []);

  function submitWinner(winnerUid: string) {
    let updateSession: any = {};
    updateSession[`sessions/${state.sessionId}/winner/`] = winnerUid;
    updateSession[`sessions/${state.sessionId}/players/${winnerUid}/score`] =
      state.players[winnerUid].score + 1;
    const dbRef = ref(db);
    update(dbRef, updateSession).then(() => {
      navigation.navigate("Winner");
    });
  }

  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      {readyToSelectWinner ? (
        <Text styles={styles.typeography}>Pick a winner</Text>
      ) : (
        <Text styles={styles.typeography}>
          Waiting for all players to select a word
        </Text>
      )}
      {state.marryWords
        ? Object.keys(state.marryWords).map((key) => {
            return (
              <Button onPress={() => submitWinner(key)} key={key}>
                {state.marryWords[key]}
              </Button>
            );
          })
        : null}
    </LinearGradient>
  );
};

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
