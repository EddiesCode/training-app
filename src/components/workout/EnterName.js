import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import { Headline } from "react-native-paper";

const EnterName = (props) => {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Headline style={{ color: theme.colors.text }}>
        Enter workout name
      </Headline>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={theme.dark ? "#FFFFFF60" : "#00000050"}
        value={props.workoutName}
        onChangeText={(text) => props.setWorkoutName(text)}
        style={styles.workoutNameInput(theme)}
      />
    </View>
  );
};

export default EnterName;

const styles = StyleSheet.create({
  workoutNameInput: (theme) => {
    return {
      width: "90%",
      paddingHorizontal: 10,
      height: 50,
      fontSize: 20,
      color: theme.colors.text,
      backgroundColor: theme.dark ? "#FFFFFF20" : "#00000019",
      borderRadius: 15,
    };
  },
});
