import { Animated, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";
import { Text } from "./Text";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { ref, child, get, update, onDisconnect } from "firebase/database";
import { db } from "../firebase";
import React, { useState } from "react";
import type { FC } from "react";
import { useStoreValue } from "../store";
import { Navigation } from "../types";

interface Props {
  navigation: Navigation;
}

export const JoinGame: FC<Props> = ({ navigation }) => {
  const [sessionId, setSessionId] = useState("");
  const [name, setName] = useState("");
  const [state, dispatch] = useStoreValue();
  const [fadeAnim] = useState(new Animated.Value(0));
  const { user } = state;
  const [noSessionFoundError, setNoSessionFoundError] = useState(false);

  function onSubmit() {
    const dbRef = ref(db);
    get(child(dbRef, `sessions/${sessionId}`)).then((res) => {
      if (res.exists()) {
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
          score: 0,
        };

        update(dbRef, updateSession).then(() => {
          onDisconnect(userToSessionRef).remove();

          navigation.navigate("WaitingToStart");
        });
      } else {
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]).start();
      }
    });
  }

  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <Text styles={{ fontSize: 16 }}>Enter the code to join a game</Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            zIndex: 10,
            opacity: fadeAnim,
          }}
          pointerEvents="none"
        >
          <Text
            styles={{ color: colors.red, fontSize: 16, pointerEvents: "none" }}
          >
            Wrong code
          </Text>
        </Animated.View>
        <TextInput
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          styles={styles.input}
        />
      </View>

      <Text styles={{ fontSize: 16, marginTop: 12 }}>What is your name?</Text>
      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        styles={styles.input}
      />
      <Button
        styles={{ marginTop: 20 }}
        onPress={onSubmit}
        disabled={!!!name || !!!sessionId}
      >
        Join
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
  typeography: {
    color: "#FFF",
  },
  input: {},
});
