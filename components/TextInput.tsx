import { FC } from "react";
import { TextInput as ReactNativeTextInput } from "react-native";

interface Props {
  children: string;
  weight?: "Bold" | "Regular" | "Light";
  styles?: Object;
}

export const TextInput: FC<Props> = ({
  children,
  weight = "Regular",
  styles,
  ...rest
}) => {
  const internalStyles = {
    outline: "none",
    fontFamily: `Kalam-${weight}`,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    ...styles,
  };

  return (
    <ReactNativeTextInput style={internalStyles} {...rest}>
      {children}
    </ReactNativeTextInput>
  );
};
