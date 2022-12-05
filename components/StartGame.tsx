import { FC } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { TextInput } from "./TextInput";
import { Text } from "./Text";
import { colors } from "../theme";
import { Button } from "./Button";
import { db } from "../firebase";
import { ref, set, onDisconnect, child, get } from "firebase/database";

import { useStoreValue } from "../store";

import { makeId } from "../helpers";

interface Props {
  navigation: any;
}

export const StartGame: FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [state, dispatch] = useStoreValue();
  const { user } = state;

  function startGame() {
    const sessionId = makeId(12);

    dispatch({
      type: "SET_SESSION",
      sessionId,
    });

    dispatch({
      type: "SET_USER",
      user: {
        ...user,
        name,
      },
    });

    let players = {};

    players[user.uid] = {
      name,
    };

    const sessionRef = ref(db, "sessions/" + sessionId);
    set(sessionRef, {
      players,
    });

    onDisconnect(sessionRef).remove();
    navigation.navigate("WaitingForPlayers");
  }

  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <Text styles={styles.typeography}>What is your name</Text>
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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button textStyles={{ color: "#FFF", fontSize: 24 }} onPress={startGame}>
        Start Game
      </Button>
    </LinearGradient>
  );
};

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
    fontSize: 24,
  },
  input: {
    backgroundColor: "#FFF",
  },
});
