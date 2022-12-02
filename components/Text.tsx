import { FC } from "react";
import { Text as ReactNativeText } from "react-native";

interface Props {
  children: string;
  weight?: "Bold" | "Regular" | "Light";
  styles?: Object;
}

export const Text: FC<Props> = ({
  children,
  weight = "Regular",
  styles,
  ...rest
}) => {
  const internalStyles = {
    fontFamily: `Kalam-${weight}`,
    ...styles,
  };

  return (
    <ReactNativeText style={internalStyles} {...rest}>
      {children}
    </ReactNativeText>
  );
};
