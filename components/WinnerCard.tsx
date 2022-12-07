import type { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "./Text";
import { colors } from "../theme";
import Icon from "react-native-vector-icons/FontAwesome5";
interface Props {
  styles?: Object;
  word: string;
  playerName: string;
  winner: boolean;
  score: number;
  dealer: boolean;
}

export const WinnerCard: FC<Props> = ({
  word,
  playerName,
  winner,
  styles,
  score,
  dealer,
  ...rest
}) => {
  const internalStyles = StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: dealer ? "100%" : 150,
      height: 100,
      borderRadius: 16,
      backgroundColor: colors.glass,
      border: `1px solid ${winner ? colors.green : colors.glass}`,
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
        <Text weight="Bold" styles={{ color: "#FFFFFF", fontSize: 16 }}>
          {word}
        </Text>
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
            />
          </View>
        </View>
      </View>
    </View>
  );
};
