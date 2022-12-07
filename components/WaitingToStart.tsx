// one you select to join, lets make a space til the main player starts
import { FC, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";
import { StyleSheet } from "react-native";
import { Text } from "./Text";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";
import { useStoreValue } from "../store";
import { Navigation } from "../types";

interface Props {
  navigation: Navigation;
}

export const WaitingToStart: FC<Props> = ({ navigation }) => {
  const [state] = useStoreValue();
  const [players, setPlayers] = useState();
  const [sessionStarted, setSessionStarted] = useState("");
  useEffect(() => {
    const playersRef = ref(db, `sessions/${state.sessionId}/players`);
    onValue(playersRef, (playersResponse) => {
      setPlayers(playersResponse.val());
    });
    const sessionStartedRef = ref(db, `sessions/${state.sessionId}/dealer`);

    onValue(sessionStartedRef, (sessionStartedResponse) => {
      setSessionStarted(sessionStartedResponse.val());
    });
  }, []);

  useEffect(() => {
    if (sessionStarted) {
      navigation.navigate("Gameplay");
    }
  }, [sessionStarted]);

  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <Text styles={styles.typeography}>Waiting for host to start</Text>
      <Text styles={{ fontSize: 16 }}>Players:</Text>
      {players &&
        Object.keys(players).map((key) => (
          <Text styles={styles.typeography} key={key}>
            {players[key].name}
          </Text>
        ))}
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
