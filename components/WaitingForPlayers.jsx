import { StyleSheet, TouchableOpacity, View, Animated } from "react-native";
import { useEffect, useState } from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "./TextInput";
import { Text } from "./Text";
import { colors } from "../theme";
import { Button } from "./Button";
import { useStoreValue } from "../store";
import { ref, onValue, update } from "firebase/database";
import { db } from "../firebase";

export default function WaitingForPlayers({ navigation }) {
  const [state, dispatch] = useStoreValue();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [players, setPlayers] = useState();

  useEffect(() => {
    const playersRef = ref(db, `sessions/${state.sessionId}/players`);
    onValue(playersRef, (playersResponse) => {
      setPlayers(playersResponse.val());
    });
  }, []);

  function copyCode() {
    Clipboard.setString(state.sessionId);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 50,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
      }),
    ]).start();
  }

  function startTheGame() {
    // set start session
    let updateSession = {};
    updateSession[`sessions/${state.sessionId}/start`] = true;

    // get the last player ID and update dealer in session

    const dbRef = ref(db);
    update(dbRef, updateSession).then((res) => {
      navigation.navigate("Gameplay");
    });
  }

  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <Text>Share this code with your friends</Text>
      <TouchableOpacity
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 300,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={copyCode}
      >
        <Animated.View
          style={{
            position: "absolute",
            zIndex: 2,
            opacity: fadeAnim,
          }}
        >
          <Text>Copied</Text>
        </Animated.View>

        <TextInput
          styles={{
            width: "100%",
            fontSize: 24,
            padding: 8,
            color: "#FFF",
            textAlign: "center",
          }}
          value={state.sessionId}
          disabled
        />
      </TouchableOpacity>
      <Text>Players:</Text>
      {players &&
        Object.keys(players).map((key) => (
          <Text key={key}>{players[key].name}</Text>
        ))}
      <Button textStyles={{ color: "#FFF" }} onPress={startTheGame}>
        Start
      </Button>
    </LinearGradient>
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
  typeography: {
    color: "#FFF",
  },
  input: {
    backgroundColor: "#FFF",
  },
});

const sessionDemo = {
  "uid-fefefefef": {
    players: {
      "uid-player1": {
        name: "Cam",
        score: 0,
        wordInPlay: "Hello",
      },
      "uid-player2": {
        name: "Shan",
        score: 0,
        wordInPlay: "",
      },
      dealer: "player-uid",
    },
  },
};

const sessionDemo2 = {
  "uid-fefefefef": {
    players: {
      "uid-player1": {
        name: "Cam",
        score: 0,
        wordInPlay: "Hello",
      },
      "uid-player2": {
        name: "Shan",
        score: 0,
      },
      dealer: "uid-player1",
    },
    marryWords: {
      "uid-player2": "Goodbye",
    },
    winner: "player--uid",
  },
};
