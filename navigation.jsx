import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Statistics from "./screens/Statistics";
import History from "./screens/History/History";
import CreateWorkout from "./screens/CreateWorkout";
import SelectExercise from "./screens/SelectExercise";
import EditWorkout from "./screens/EditWorkout";
import Workouts from "./screens/Workouts";
import StartExercise from "./screens/StartExercise/StartExercise";

import { useDarkMode } from "./context/themeContext";

import { CustomDarkTheme, CustomLightTheme } from "./assets/globalStyle";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getTabBarIcon = (route, focused, color, size) => {
  let iconName;

  switch (route.name) {
    case "Home":
      iconName = focused ? "home" : "home-outline";
      break;
    case "Statistics":
      iconName = focused ? "ios-stats-chart" : "ios-stats-chart-outline";
      break;
    case "Settings":
      iconName = focused ? "settings" : "settings-outline";
      break;
    default:
      iconName = focused ? "home" : "home-outline";
      break;
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

// Tab navigation component
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "left",
        tabBarIcon: ({ focused, color, size }) => {
          return getTabBarIcon(route, focused, color, size);
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Statistics" component={Statistics} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

// Stack navigation component
function Navigation() {
  const darkMode = useDarkMode().darkMode;

  return (
    <NavigationContainer theme={CustomDarkTheme}>
      <StatusBar
        style={darkMode ? "light" : "dark"}
        backgroundColor={
          darkMode
            ? CustomDarkTheme.colors.card
            : CustomLightTheme.colors.headerColor
        }
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateWorkout"
          component={CreateWorkout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectExercise"
          component={SelectExercise}
          options={{ headerTitle: "Select Exercise" }}
        />
        <Stack.Screen
          name="StartExercise"
          component={StartExercise}
          options={{ headerTitle: "Start Exercise" }}
        />
        <Stack.Screen
          name="Workouts"
          component={Workouts}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name="EditWorkout"
          component={EditWorkout}
          options={({ route }) => ({ title: route.params.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
