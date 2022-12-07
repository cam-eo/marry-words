import { FC } from "react";
import { TextInput as ReactNativeTextInput } from "react-native";

interface Props {
  weight?: "Bold" | "Regular" | "Light";
  styles?: Object;
  value: string;
  onChange: (_e: any) => void;
}

export const TextInput: FC<Props> = ({
  weight = "Regular",
  styles,
  value,
  onChange,
  ...rest
}) => {
  const internalStyles = {
    outline: "none",
    fontFamily: `Kalam-${weight}`,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: "100%",
    maxWidth: 300,
    fontSize: 24,
    padding: 8,
    color: "#FFF",
    textAlign: "center",
    ...styles,
  };

  return (
    <ReactNativeTextInput
      style={internalStyles}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};
