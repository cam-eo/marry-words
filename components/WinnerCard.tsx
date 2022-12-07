import type { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "./Text";
import { colors } from "../theme";

interface Props {
  styles?: Object;
  word: string;
  playerName: string;
  winner: boolean;
}

export const WinnerCard: FC<Props> = ({
  word,
  playerName,
  winner,
  styles,
  ...rest
}) => {
  const internalStyles = StyleSheet.create({
    button: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: 200,
      maxHeight: 100,
      borderRadius: 16,
      backgroundColor: winner ? colors.green : colors.glass,
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      ...styles,
      position: "relative",
    },
  });

  return (
    <View style={internalStyles.button} {...rest}>
      <Text>{word}</Text>
      <Text
        styles={{
          position: "absolute",
          justifySelf: "flex-end",
          alignSelf: "flex-end",
          marginBottom: 0,
        }}
      >
        {playerName}
      </Text>
    </View>
  );
};
