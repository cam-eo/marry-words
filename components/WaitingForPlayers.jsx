import { StyleSheet, TouchableOpacity, View, Animated } from "react-native";
import { useEffect, useState } from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "./TextInput";
import { Text } from "./Text";
import { colors } from "../theme";
import { Button } from "./Button";
import { useStoreValue } from "../store";

export default function WaitingForPlayers() {
  const [state, dispatch] = useStoreValue();
  const [fadeAnim] = useState(new Animated.Value(0));

  function copyCode() {
    Clipboard.setString(state.sessionId);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
      }),
    ]).start();
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
      <Text>Shandre</Text>
      <Text>Roche</Text>
      <Text>Mendes</Text>
      <Button textStyles={{ color: "#FFF" }} onPress={() => start()}>
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

/**
 * {
 *    sessions: {
 *      uid: dewvervbadbvdzf,
 *      users: {
 *         userUid: {
 *            name: "Cam",
 *            score: 0,
 *            wordInPlay: "Hello"
 *         }
 *      },
 *      wordInPlay: "Goodbye",
 *      previousWords: {
 *
 *      }
 *    }
 * }
 *
 */
