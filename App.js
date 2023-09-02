import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Dropdown from "./components/Dropdown";
import { storage } from "./components/Dropdown";
import MainScreen from "./components/MainScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
    // const [shouldRerender, setShouldRerender] = useState(false);
    // console.log(storage.getString("prayer-times-stringified-array"));

    return (
        <NavigationContainer>
            <StatusBar style="auto" />

            <Stack.Navigator initialRouteName="MainScreen">
                <Stack.Screen
                    name="MainScreen"
                    component={MainScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Dropdown"
                    component={Dropdown}
                    options={{ headerTransparent: true }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
