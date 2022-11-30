import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "./Text";

interface Props {
  children: string;
  weight?: "Bold" | "Regular" | "Light";
  styles?: Object;
  textStyles?: Object;
}

export const Button: FC<Props> = ({
  children,
  weight = "Regular",
  styles,
  textStyles,
  ...rest
}) => {
  const internalStyles = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    maxHeight: 100,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    ...styles,
  };

  return (
    <TouchableOpacity style={internalStyles} {...rest}>
      <Text weight={weight} styles={textStyles}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
