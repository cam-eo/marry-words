import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import Home from "./components/Home";
import { JoinGame } from "./components/JoinGame";
import { StartGame } from "./components/StartGame";
import WaitingForPlayers from "./components/WaitingForPlayers";
import { WaitingToStart } from "./components/WaitingToStart";
import { MarryAWord } from "./components/MarryAWord";
import { WaitingToPickAWinner } from "./components/WaitingToPickAWinner";

import Gameplay from "./components/Gameplay";
import { StoreProvider, initialState, reducer } from "./store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Kalam-Bold": require("./assets/fonts/Kalam-Bold.ttf"),
    "Kalam-Light": require("./assets/fonts/Kalam-Light.ttf"),
    "Kalam-Regular": require("./assets/fonts/Kalam-Regular.ttf"),
  });

  const Stack = createStackNavigator();

  const linking = {
    config: {
      screens: {
        Home: "/",
        StartGame: "/start",
        WaitingForPlayers: "/waiting-for-players",
        WaitingToStart: "waiting-to-start",
        JoinGame: "/join",
        Gameplay: "/play",
      },
    },
  };

  return (
    <StoreProvider initialState={initialState} reducer={reducer}>
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
            name="WaitingForPlayers"
            component={WaitingForPlayers}
            options={{ title: "WaitingForPlayers", headerShown: false }}
          />
          <Stack.Screen
            name="WaitingToStart"
            component={WaitingToStart}
            options={{ title: "WaitingToStart", headerShown: false }}
          />
          <Stack.Screen
            name="JoinGame"
            component={JoinGame}
            options={{ title: "Join", headerShown: false }}
          />
          <Stack.Screen
            name="Gameplay"
            component={Gameplay}
            options={{ title: "Gameplay", headerShown: false }}
          />
          <Stack.Screen
            name="MarryAWord"
            component={MarryAWord}
            options={{ title: "MarryAWord", headerShown: false }}
          />
          <Stack.Screen
            name="WaitingToPickAWinner"
            component={WaitingToPickAWinner}
            options={{ title: "WaitingToPickAWinner", headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
