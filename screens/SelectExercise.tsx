import { Alert, StyleSheet, View } from "react-native";
import { useState, useLayoutEffect, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import workoutStore from "../store/workoutStore/workoutStore";
import Exercises from "../components/workout/Exercises";

const SelectExercise = ({ navigation, route }) => {
  const { workoutName, workoutId } = route.params;

  const theme = useTheme();
  const [exercises, setExercises] = useState<Array<any> | undefined>(undefined);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: workoutName,
    });
  }, []);

  const selectExercise = () => {
    navigation.navigate("StartWorkout");
  };

  useEffect(() => {
    const workout = workoutStore.getWorkoutById(workoutId);
    setExercises(workout.exercises.slice());
  }, []);

  useEffect(() => {
    if (exercises && exercises.length < 1) {
      Alert.alert("Workout finished!", "Great job!", [
        {
          text: "Continue",
          onPress: navigation.navigate("Home"),
        },
      ]);
    }
  }, [exercises]);

  return (
    <View>
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        workoutId={workoutId}
        screen="SelectExercise"
      />
    </View>
  );
};

export default SelectExercise;

const styles = StyleSheet.create({});
