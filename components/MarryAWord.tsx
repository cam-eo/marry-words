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
import { Navigation } from "../types";

interface Props {
  navigation: Navigation;
}

export const MarryAWord: FC<Props> = ({ navigation }) => {
  const [state, dispatch] = useStoreValue();

  const [wordToMarry, setWordToMarry] = useState("");

  function submit() {
    let updateSession: any = {};
    updateSession[`sessions/${state.sessionId}/marryWords/${state.user.uid}`] =
      wordToMarry;

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
      <Text styles={{ fontSize: 16, marginBottom: 4 }}>
        <>
          {`The word to marry is: `}
          <Text
            styles={{
              backgroundColor: colors.glass,
              borderRadius: 4,
              paddingHorizontal: 4,
            }}
          >{`${state.wordInPlay}`}</Text>
        </>
      </Text>
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
