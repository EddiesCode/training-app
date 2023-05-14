import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import WorkoutCard from "../components/workout/WorkoutCard";
import workoutStore from "../store/workoutStore";
import { Observer } from "mobx-react";
import { Button } from "react-native-paper";

import { useTheme } from "@react-navigation/native";

const EditWorkout = ({ navigation, route }) => {
  const { workoutName, workoutId } = route.params;

  const theme = useTheme();
  const [exercises, setExercises] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: workoutName,
    });
  }, []);

  useEffect(() => {
    const workout = workoutStore.getWorkoutById(workoutId);
    setExercises(workout.exercises.slice());
  }, []);

  function deleteExercise(id) {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  }

  function increaseAmount(id, type) {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id !== id) return exercise;
        switch (type) {
          case "weight":
            return { ...exercise, defaultWeight: exercise.defaultWeight + 1 };
          default:
            return { ...exercise };
        }
      })
    );
  }

  function decreaseAmount(id, type) {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id !== id) return exercise;
        switch (type) {
          case "weight":
            return {
              ...exercise,
              defaultWeight:
                exercise.defaultWeight > 0 ? exercise.defaultWeight - 1 : 0,
            };
          default:
            return { ...exercise };
        }
      })
    );
  }

  return (
    <>
      <Observer>
        {() => (
          <FlatList
            contentContainerStyle={{
              margin: 10,
              paddingBottom: 80,
            }}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            data={exercises}
            numColumns={2}
            renderItem={({ item, index }) => (
              <WorkoutCard
                id={item.id}
                key={item.id}
                index={index}
                numColumns={2}
                exercise={item.exercise}
                weight={item.defaultWeight}
                screen="edit"
                deleteExercise={deleteExercise}
                increaseAmount={increaseAmount}
                decreaseAmount={decreaseAmount}
              />
            )}
          />
        )}
      </Observer>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          width: "100%",
          height: 50,
        }}
      >
        <Button
          color={"#c0392b"}
          mode="contained"
          icon={"delete"}
          uppercase={false}
          contentStyle={{
            flexDirection: "row-reverse",
          }}
          style={{
            borderRadius: 50,
            justifyContent: "center",
          }}
          onPress={() => {
            workoutStore.deleteWorkout(workoutId);
            navigation.goBack();
          }}
        >
          Delete
        </Button>
        <Button
          color={"#2ecc71"}
          mode="contained"
          icon={"check"}
          uppercase={false}
          contentStyle={{
            flexDirection: "row-reverse",
          }}
          style={{
            borderRadius: 50,
            justifyContent: "center",
          }}
          onPress={() => {
            workoutStore.updateWorkout(workoutId, exercises);
            navigation.goBack();
          }}
        >
          Save
        </Button>
      </View>
    </>
  );
};

export default EditWorkout;

const styles = StyleSheet.create({});
