import type { FC } from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";
import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { db } from "../firebase";
import { Button } from "./Button";
import { useStoreValue } from "../store";
import { ref, child, get, update, onValue } from "firebase/database";
import { Navigation } from "../types";

interface Props {
  navigation: Navigation;
}

export const Gameplay: FC<Props> = function ({ navigation }) {
  const [myTurn, setMyTurn] = useState<boolean | null>(null);
  const [state, dispatch] = useStoreValue();

  const [word, setWord] = useState("");

  useEffect(() => {
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
  }, []);

  function submit() {
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
      {myTurn ? (
        <>
          <Text styles={{ fontSize: 16 }}>Type in a word</Text>
          <TextInput
            styles={{
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
            <Text styles={styles.typeography}>
              {`Waiting for ${state.dealer.name} to select a word`}
            </Text>
          ) : null}
        </>
      )}
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

// Idea: Pick a winner and loser or only winner? maybe a setting
