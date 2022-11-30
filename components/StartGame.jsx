import { StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { TextInput } from "./TextInput";
import { Text } from "./Text";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme";
import { Button } from "./Button";
import { db } from "../firebase";

export default function StartGame({ navigation }) {
  const [name, setName] = useState("");
  // function start() {
  //   set(ref(db, "users/" + userId), {
  //     name,
  //     gameMaster: true,
  //   });

  //   set(ref(db, "sessions/"), {
  //     name,
  //     gameMaster: true,
  //   });

  //   navigation.navigate("Gameplay");
  // }

  console.log("name: ", name);

  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
      style={styles.container}
    >
      <Text>What is your name</Text>
      <TextInput
        styles={{
          width: "100%",
          maxWidth: 300,
          fontSize: 24,
          padding: 8,
          color: "#FFF",
          textAlign: "center",
        }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Text>Share this code with your friends</Text>
      {/* *npm install --save @react-native-clipboard/clipboard */}
      <TouchableOpacity style={{ width: "100%", maxWidth: 300 }}>
        <TextInput
          styles={{
            width: "100%",
            fontSize: 24,
            padding: 8,
            color: "#FFF",
            textAlign: "center",
          }}
          value={"---CODE---"}
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
