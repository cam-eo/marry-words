import { FC, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";
import { StyleSheet } from "react-native";
import { Text } from "./Text";
import { Button } from "./Button";
import { useStoreValue } from "../store";

import { db } from "../firebase";

import {
  ref,
  child,
  get,
  update,
  onDisconnect,
  onValue,
} from "firebase/database";

interface PlayerWinnerCard {
  uid: string;
  winner: boolean;
  name: string;
  word: string;
}

interface Props {}

export const Winner: FC<Props> = ({ navigation }) => {
  const [state, dispatch] = useStoreValue();

  console.log("state.players: ", state.players);

  const [listWinner, setListWinner] = useState([]);
  const [dealer, setDealer] = useState("");

  useEffect(() => {
    const winnerRef = ref(db, `sessions/${state.sessionId}/winner`);
    onValue(winnerRef, (winnerResponse) => {
      if (winnerResponse.val()) {
        const dbRef = ref(db);
        get(child(dbRef, `sessions/${state.sessionId}`)).then((res) => {
          //
          setDealer(res.val().dealer);
          const winnerList = Object.keys(res.val().marryWords).map(
            (key: string) => {
              let obj = { uid: key, word: res.val().marryWords[key] };

              obj.name = res.val().players[key].name;
              if (res.val().winner === key) {
                obj.winner = true;
              } else {
                obj.winner = false;
              }
              return obj;
            }
          );

          setListWinner(winnerList);

          const winnerRef = ref(db, `sessions/${state.sessionId}/winner`);

          onValue(winnerRef, (winnerResponse) => {
            if (!winnerResponse.val()) navigation.navigate("Gameplay");
          });
        });
      }
    });
  }, []);

  function startNextRound() {
    const myIndex: number = Object.keys(state.players).indexOf(state.user.uid);

    console.log("myIndex: ", myIndex);

    let nextPlayerIndex = myIndex + 1;

    if (nextPlayerIndex === Object.keys(state.players).length) {
      nextPlayerIndex = 0;
    }

    let updatedSession = {};

    console.log(
      "Object.keys(state.players)[nextPlayerIndex]",
      Object.keys(state.players)[nextPlayerIndex]
    );

    updatedSession[`sessions/${state.sessionId}/marryWords/`] = null;
    updatedSession[`sessions/${state.sessionId}/dealer/`] = Object.keys(
      state.players
    )[nextPlayerIndex];
    updatedSession[`sessions/${state.sessionId}/winner/`] = null;
    updatedSession[
      `sessions/${state.sessionId}/players/${state.user.uid}/wordInPlay`
    ] = null;

    console.log("updatedSession: ", updatedSession);

    const dbRef = ref(db);

    update(dbRef, updatedSession).then(() => {
      navigation.navigate("Gameplay");
    });
  }

  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      {listWinner.length ? (
        <Text>Winners</Text>
      ) : (
        <Text>Waiting for winner</Text>
      )}
      {listWinner.length
        ? listWinner.map((player: PlayerWinnerCard) => (
            <Text
              styles={{ backgroundColor: player.winner ? "green" : "white" }}
              key={player.uid}
            >{`${player.name} -> ${player.word}`}</Text>
          ))
        : null}
      {listWinner.length && dealer === state.user.uid ? (
        <Button onPress={startNextRound}>start next round</Button>
      ) : null}
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
