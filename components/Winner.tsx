import { FC, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";
import { StyleSheet, View } from "react-native";
import { Text } from "./Text";
import { Button } from "./Button";
import { WinnerCard } from "./WinnerCard";
import { useStoreValue } from "../store";
import { db } from "../firebase";
import { ref, child, get, update, onValue } from "firebase/database";
import { Navigation } from "../types";

interface PlayerWinnerCard {
  uid: string;
  winner: boolean;
  name: string;
  word: string;
  score: number;
  dealer: boolean;
}

interface Props {
  navigation: Navigation;
}

interface WinnerList {
  uid: string;
  word: string;
  winner: boolean;
  name: string;
  score: number;
}

export const Winner: FC<Props> = ({ navigation }) => {
  const [state, dispatch] = useStoreValue();
  const [listWinner, setListWinner] = useState<WinnerList[]>([]);
  const [dealer, setDealer] = useState();

  useEffect(() => {
    const winnerRef = ref(db, `sessions/${state.sessionId}/winner`);
    onValue(winnerRef, (winnerResponse) => {
      if (winnerResponse.val()) {
        const dbRef = ref(db);
        get(child(dbRef, `sessions/${state.sessionId}`)).then((res) => {
          const winnerList = Object.keys(res.val().players).map((player) => {
            const playerWithWord = res.val().players[player];

            if (res.val().dealer === player) {
              setDealer(playerWithWord);
            }

            const marryWord = res.val().marryWords[player];

            if (marryWord) {
              playerWithWord.word = res.val().marryWords[player];
            }

            if (res.val().winner === player) playerWithWord.winner = true;
            if (res.val().dealer === player) playerWithWord.dealer = true;

            return playerWithWord;
          });

          setListWinner(winnerList);

          const winnerRef = ref(db, `sessions/${state.sessionId}/winner`);

          onValue(winnerRef, (winnerResponse) => {
            if (!winnerResponse.val()) {
              dispatch("SET_DEALER", { dealer: null });
              navigation.navigate("Gameplay");
            }
          });
        });
      }
    });
  }, []);

  function startNextRound() {
    const myIndex: number = Object.keys(state.players)
      .sort()
      .indexOf(state.user.uid);

    dispatch("SET_DEALER", { dealer: null });

    let nextPlayerIndex = myIndex + 1;

    if (nextPlayerIndex === Object.keys(state.players).length) {
      nextPlayerIndex = 0;
    }

    let updatedSession = {};

    updatedSession[`sessions/${state.sessionId}/marryWords/`] = null;
    updatedSession[`sessions/${state.sessionId}/dealer/`] = Object.keys(
      state.players
    )[nextPlayerIndex];
    updatedSession[`sessions/${state.sessionId}/winner/`] = null;
    updatedSession[
      `sessions/${state.sessionId}/players/${state.user.uid}/wordInPlay`
    ] = null;

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
        <Text styles={styles.typeography}>Winners</Text>
      ) : (
        <Text styles={styles.typeography}>Waiting for winner</Text>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: 320,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {dealer ? (
          <WinnerCard
            key={dealer.uid}
            playerName={dealer.name}
            winner={false}
            dealer={true}
            word={dealer.wordInPlay}
            score={dealer.score}
            styles={{ marginBottom: 8 }}
          />
        ) : null}
        {listWinner.length
          ? listWinner.map((player: PlayerWinnerCard) =>
              player.dealer ? null : (
                <WinnerCard
                  key={player.uid}
                  playerName={player.name}
                  winner={player.winner}
                  word={player.word}
                  score={player.score}
                  dealer={false}
                  styles={{ marginBottom: 8 }}
                />
              )
            )
          : null}
      </View>
      {listWinner.length && state.dealer.uid === state.user.uid ? (
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
    fontSize: 24,
  },
  input: {},
});
