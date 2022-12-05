import { FC, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";
import { StyleSheet } from "react-native";
import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { useStoreValue } from "../store";
import { ref, child, get, update, onValue } from "firebase/database";

interface Props {}

export const WaitingToPickAWinner: FC<Props> = ({ navigation }) => {
  const [wordToMarry, setWordToMarry] = useState("");
  const [state, dispatch] = useStoreValue();

  function submit() {
    //
    // let updateSession: any = {};
    // updateSession[
    //   `sessions/${state.sessionId}/players/${state.user.uid}/wordInPlay`
    // ];
    // const dbRef = ref(db);
    // update(dbRef, updateSession).then(() => {
    //   navigation.navigate("WaitingToPickAWinner");
    // });
  }

  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <Text styles={styles.typeography}>
        Waiting for players to select a word
      </Text>
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
