import { StyleSheet, Text, View } from "react-native";
import { useState, useLayoutEffect, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import workoutStore from "../store/workoutStore/workoutStore";
import Exercises from "../components/workout/Exercises";

const SelectExercise = ({ navigation, route }) => {
  const { workoutName, workoutId } = route.params;

  const theme = useTheme();
  const [exercises, setExercises] = useState([]);

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

  return (
    <View>
      <Exercises
        exercises={exercises}
        workoutId={workoutId}
        screen="SelectExercise"
      />
    </View>
  );
};

export default SelectExercise;

const styles = StyleSheet.create({});
