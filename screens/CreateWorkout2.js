import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { Divider, Paragraph } from "react-native-paper";

import ProgressBar from "../components/workout/ProgressBar";
import DefaultExercises from "./DefaultExercises";

import { useMultistepPage } from "../hooks/useMultistepPage";
import { useTheme } from "@react-navigation/native";

import exerciseStore from "../store/exerciseStore";

const CreateWorkout2 = ({ navigation }) => {
  const theme = useTheme();

  const data = exerciseStore.defaultExercises.map((exercise) => {
    return { ...exercise, sets: 0, reps: 0, selected: false };
  });
  const [exercises, setExercises] = useState(data);

  function selectExercise(id) {
    let newExcerciseArr = exercises.map((exercise) => {
      if (exercise.id !== id) return exercise;
      else return { ...exercise, selected: !exercise.selected };
    });
    setExercises(newExcerciseArr);
  }

  const { step, steps, goTo, next, back, currentStepIndex } = useMultistepPage([
    <DefaultExercises exercises={exercises} selectExercise={selectExercise} />,
    <View style={{ flex: 1 }}>
      <Paragraph>TESTING</Paragraph>
    </View>,
    <View style={{ flex: 1 }}>
      <Paragraph>TESTING TEST SETSETSET</Paragraph>
    </View>,
  ]);

  function saveWorkout() {
    console.log("Save Workout");
  }

  function cancel() {
    navigation.navigate("Home");
  }

  return (
    <View style={{ flex: 1 }}>
      <ProgressBar currentStepIndex={currentStepIndex} goTo={goTo} />
      <Divider style={{ height: 1 }} />
      {step}
      <Divider style={{ height: 1 }} />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              borderColor: theme.colors.primary,
            },
          ]}
          onPress={() => (currentStepIndex !== 0 ? back() : cancel())}
        >
          <Paragraph>{currentStepIndex !== 0 ? "Back" : "Cancel"}</Paragraph>
        </TouchableOpacity>
        <View style={{ width: 10 }}></View>

        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.primary,
            },
          ]}
          onPress={() =>
            currentStepIndex !== steps.length - 1 ? next() : saveWorkout()
          }
        >
          <Paragraph>
            {currentStepIndex !== steps.length - 1 ? "Next" : "Save"}
          </Paragraph>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateWorkout2;

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    paddingVertical: 10,
    height: 70,
  },
  buttonStyle: {
    flex: 1,
    height: "100%",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
