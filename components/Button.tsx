import type { FC } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "./Text";

interface Props {
  children: string;
  weight?: "Bold" | "Regular" | "Light";
  styles?: Object;
  textStyles?: Object;
  onPress: () => void;
  disabled?: boolean;
}

export const Button: FC<Props> = ({
  children,
  weight = "Regular",
  styles,
  textStyles,
  onPress,
  disabled,
  ...rest
}) => {
  const internalStyles = StyleSheet.create({
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 200,
      height: 100,
      borderRadius: 16,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      ...styles,
    },
    typeography: {
      fontSize: 24,
      color: "#FFFFFF",
    },
  });

  return (
    <TouchableOpacity
      style={internalStyles.button}
      {...rest}
      onPress={onPress}
      disabled={disabled}
    >
      <Text weight={weight} styles={internalStyles.typeography}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
