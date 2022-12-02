import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";

import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { ref, child, get, update, onDisconnect } from "firebase/database";
import { db } from "../firebase";
import { FC, useState } from "react";
import { useStoreValue } from "../store";
import { Navigation } from "../types";

interface Props {
  navigation: Navigation;
}

export const JoinGame: FC<Props> = ({ navigation }) => {
  const [sessionId, setSessionId] = useState("");
  const [name, setName] = useState("");
  const [state, dispatch] = useStoreValue();
  const { user } = state;

  function onSubmit() {
    const dbRef = ref(db);
    get(child(dbRef, `sessions/${sessionId}`)).then((res) => {
      // console.log("got session: ", res.val());

      dispatch({
        type: "SET_SESSION",
        sessionId,
      });

      const userToSessionRef = ref(
        db,
        `sessions/${sessionId}/players/${user.uid}`
      );

      let updateSession = {};
      updateSession[`sessions/${sessionId}/players/${user.uid}`] = {
        name,
      };

      update(dbRef, updateSession).then(() => {
        onDisconnect(userToSessionRef).remove();

        navigation.navigate("WaitingToStart");
      });
    });

    // Error Message on not SessionId Available
  }

  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <Text styles={styles.typeography}>Enter the code to join a game</Text>
      <TextInput
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
        styles={styles.input}
      />
      <Text styles={styles.typeography}>What is your name?</Text>
      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        styles={styles.input}
      />
      <Button onPress={onSubmit}>Join</Button>
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
  typeography: {
    color: "#FFF",
  },
  input: {},
});
