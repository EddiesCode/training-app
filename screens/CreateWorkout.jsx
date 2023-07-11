import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { Paragraph, Snackbar } from "react-native-paper";

import ProgressBar from "../components/workout/ProgressBar";
import Exercises from "../components/workout/Exercises";
import UpdateExercises from "../components/workout/UpdateExercises";
import EnterName from "../components/workout/EnterName";
import CreateWorkoutModal from "../components/workout/CreateWorkoutModal";

import { useMultistepPage } from "../hooks/useMultistepPage";
import { useTheme } from "@react-navigation/native";

import exerciseStore from "../store/exerciseStore/exerciseStore";
import workoutStore from "../store/workoutStore/workoutStore";

import { Observer } from "mobx-react";
import { Divider } from "@rneui/base";

import { SafeAreaView } from "react-native-safe-area-context";

const CreateWorkout = ({ navigation }) => {
  const theme = useTheme();
  const [workoutName, setWorkoutName] = useState("");
  const [visible, setVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const { step, steps, goTo, next, back, currentStepIndex } = useMultistepPage([
    <Exercises screen="CreateWorkout" />,
    <UpdateExercises />,
    <EnterName workoutName={workoutName} setWorkoutName={setWorkoutName} />,
  ]);

  function saveWorkout() {
    console.log(workoutName);
    workoutStore.addWorkout(workoutName, exerciseStore.exercises);
    exerciseStore.deleteAddedExercises();
    navigation.navigate("Home");
  }

  function cancel() {
    exerciseStore.deleteAddedExercises();
    navigation.navigate("Home");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.card }}>
      <ProgressBar currentStepIndex={currentStepIndex} goTo={goTo} />
      {step}
      <Divider />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => (currentStepIndex !== 0 ? back() : cancel())}
        >
          <Paragraph style={{ color: theme.colors.text }}>
            {currentStepIndex !== 0
              ? "Back".toUpperCase()
              : "Cancel".toUpperCase()}
          </Paragraph>
        </TouchableOpacity>
        {currentStepIndex === 0 ? (
          <TouchableOpacity
            style={[styles.buttonStyle, { marginHorizontal: 10 }]}
            onPress={() => setVisible(true)}
          >
            <Paragraph
              style={{ margin: 0, padding: 0, color: theme.colors.text }}
            >
              {"Add custom".toUpperCase()}
            </Paragraph>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 10 }} />
        )}
        <Observer>
          {() => (
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                currentStepIndex !== steps.length - 1 ? next() : saveWorkout()
              }
            >
              <Paragraph style={{ color: theme.colors.text }}>
                {currentStepIndex !== steps.length - 1
                  ? "Next".toUpperCase()
                  : "Save".toUpperCase()}
              </Paragraph>
            </TouchableOpacity>
          )}
        </Observer>
      </View>
      <CreateWorkoutModal
        visible={visible}
        setVisible={setVisible}
        setSnackbarVisible={setSnackbarVisible}
      />
      <Snackbar
        wrapperStyle={{ bottom: 60 }}
        visible={snackbarVisible}
        duration={2000}
        onDismiss={() => {
          setSnackbarVisible(false);
          exerciseStore.updateSnackBarText("");
        }}
      >
        Added exercise '{exerciseStore.snackBarText}'
      </Snackbar>
    </SafeAreaView>
  );
};

export default CreateWorkout;

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    height: 70,
  },
  buttonStyle: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
