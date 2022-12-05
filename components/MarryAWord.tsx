import { FC, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";
import { StyleSheet } from "react-native";
import { Text } from "./Text";
import { TextInput } from "./TextInput";
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

interface Props {}

export const MarryAWord: FC<Props> = () => {
  const [state, dispatch] = useStoreValue();

  const [wordToMarry, setWordToMarry] = useState("");

  //   useEffect(() => {}, []);

  function submit() {
    //
  }

  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <Text
        styles={styles.typeography}
      >{`The word to marry is: ${state.wordInPlay}`}</Text>
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
        value={wordToMarry}
        onChange={(e) => setWordToMarry(e.target.value)}
      />
      <Button textStyles={{ color: "#FFF", fontSize: 24 }} onPress={submit}>
        Propose
      </Button>
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
