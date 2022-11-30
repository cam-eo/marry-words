import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

import Home from "./components/Home";
import JoinGame from "./components/JoinGame";
import StartGame from "./components/StartGame";
import Gameplay from "./components/Gameplay";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Kalam-Bold": require("./assets/fonts/Kalam-Bold.ttf"),
    "Kalam-Light": require("./assets/fonts/Kalam-Light.ttf"),
    "Kalam-Regular": require("./assets/fonts/Kalam-Regular.ttf"),
  });

  const linking = {
    config: {
      screens: {
        Home: "/",
        StartGame: "start",
        JoinGame: "join",
        Gameplay: "play",
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen
          name="StartGame"
          component={StartGame}
          options={{ title: "Start", headerShown: false }}
        />
        <Stack.Screen
          name="JoinGame"
          component={JoinGame}
          options={{ title: "Join", headerShown: false }}
        />
        <Stack.Screen
          name="Gameplay"
          component={Gameplay}
          options={{ title: "Play", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
