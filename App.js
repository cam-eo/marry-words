import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import Home from "./components/Home";
import { JoinGame } from "./components/JoinGame";
import { StartGame } from "./components/StartGame";
import WaitingForPlayers from "./components/WaitingForPlayers";
import { WaitingToStart } from "./components/WaitingToStart";
import { MarryAWord } from "./components/MarryAWord";
import { PickAWinner } from "./components/PickAWinner";
import { Winner } from "./components/Winner";
import { Gameplay } from "./components/Gameplay";
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
        MarryAWord: "/marry-a-word",
        PickAWinner: "/pick-a-word",
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
            name="PickAWinner"
            component={PickAWinner}
            options={{ title: "PickAWinner", headerShown: false }}
          />
          <Stack.Screen
            name="Winner"
            component={Winner}
            options={{ title: "Winner", headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

// Alpha test-1: NOTES

// Same word, join so that both players get the point (TWINSIES)
// make player name a different colour Waiting for PLAYER to start
// only show options once everyone has put something through
// Show the word when picking the proposed words
// Enable autocorrect on word input
// Pick 2 inners after 10 points
// sound
// End game screen
