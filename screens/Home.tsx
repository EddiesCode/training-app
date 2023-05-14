import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import HomeScreenButton from "../components/home/HomeScreenButton";

const Home = () => {
  const theme = useTheme();
  const buttonArray = [
    {
      screen: "CreateWorkout",
      type: "create",
      text: "Create Workout",
    },
    {
      screen: "Workouts",
      type: "start",
      text: "Start Workout",
    },
    {
      screen: "Workouts",
      type: "edit",
      text: "Edit Workout",
    },
  ];

  return (
    <View style={styles.wrapper}>
      {buttonArray.map((button, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            marginBottom: index != buttonArray.length - 1 ? 16 : 0,
          }}
        >
          <HomeScreenButton
            screen={button.screen}
            type={button.type}
            text={button.text}
            theme={theme}
          />
        </View>
      ))}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 16,
  },
});
