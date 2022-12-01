import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "./Text";

interface Props {
  children: string;
  weight?: "Bold" | "Regular" | "Light";
  styles?: Object;
  textStyles?: Object;
  onPress: () => void;
}

export const Button: FC<Props> = ({
  children,
  weight = "Regular",
  styles,
  textStyles,
  onPress,
  ...rest
}) => {
  const internalStyles = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    maxHeight: 100,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    ...styles,
  };

  return (
    <TouchableOpacity style={internalStyles} {...rest} onPress={onPress}>
      <Text weight={weight} styles={textStyles}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
