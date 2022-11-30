import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Stack = createStackNavigator();

import Home from "./components/Home";
import JoinGame from "./components/JoinGame";
import StartGame from "./components/StartGame";
import Gameplay from "./components/Gameplay";

export default function App() {
  return (
    <NavigationContainer>
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
