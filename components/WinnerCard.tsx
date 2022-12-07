import type { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "./Text";
import { colors } from "../theme";
import Icon from "react-native-vector-icons/FontAwesome5";

const starSvgAsset = require("../assets/star-outline.svg");

interface Props {
  styles?: Object;
  word: string;
  playerName: string;
  winner: boolean;
  score: number;
}

export const WinnerCard: FC<Props> = ({
  word,
  playerName,
  winner,
  styles,
  score,
  ...rest
}) => {
  const internalStyles = StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 150,
      height: 100,
      borderRadius: 16,
      backgroundColor: winner ? colors.green : colors.glass,
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      ...styles,
      position: "relative",
    },
  });

  return (
    <View style={internalStyles.container} {...rest}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Text>{word}</Text>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Text
            styles={{
              marginLeft: 8,
            }}
          >
            {playerName}
          </Text>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              marginRight: 4,
              marginBottom: 4,
            }}
          >
            <Text
              styles={{
                position: "absolute",
                zIndex: 10,
                marginTop: 6,
              }}
            >
              {score}
            </Text>
            <Icon
              name="star"
              size={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontSize: 32,
              }}
              stroke={4}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
