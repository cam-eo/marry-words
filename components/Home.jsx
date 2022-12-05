import { useEffect } from "react";

import { StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Text } from "./Text";
import { colors } from "../theme";

import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase";
import { useStoreValue } from "../store";

export default function Home({ navigation }) {
  const [, dispatch] = useStoreValue();

  useEffect(() => {
    signInAnonymously(auth)
      .then((authResponse) => {
        dispatch({
          type: "SET_USER",
          user: {
            uid: authResponse.user.uid,
          },
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("FIREBASE ERROR AUTH'ING: ", { errorCode, errorMessage });
      });
  }, []);

  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <Text style={styles.typeography}>Marry Words</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("StartGame")}
        style={styles.button}
      >
        <Text weight="Bold" styles={styles.typeography}>
          Start Game
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("JoinGame")}
        style={styles.button}
      >
        <Text weight="Bold" styles={styles.typeography}>
          Join Game
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFE3EA",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "200px",
    width: "100%",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    width: 200,
    maxHeight: 100,
    marginBottom: 12,
    borderRadius: 16,
    color: "#FFF",
  },
  typeography: {
    color: "#FFF",
    fontSize: 20,
  },
});
