import React from "react";
import { Text } from "react-native-paper";
import exerciseStore from "../store/exerciseStore";

export const StartExercise = ({ navigation, route }) => {
  const { exerciseName, exerciseId, sets, reps } = route.params;
  console.log(sets, reps);

  return (
    <Text style={{ color: "white" }}>
      {exerciseName}, {exerciseId}, {sets}, {reps}
    </Text>
  );
};

export default StartExercise;
