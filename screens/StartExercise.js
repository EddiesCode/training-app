import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, Headline } from "react-native-paper";
import AmountPill from "../components/workout/AmountPill";
import workoutStore from "../store/workoutStore";
import exerciseStore from "../store/exerciseStore";

export const StartExercise = ({ navigation, route }) => {
  const { exerciseName, exerciseId, workoutId } = route.params;

  const [reps, setReps] = useState(0);
  const [set, setSet] = useState(0);
  const [weight, setWeight] = useState(
    workoutStore.getWorkoutExerciseDefualtWeightById(workoutId, exerciseId)
  );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Headline style={{ color: "white" }}>{exerciseName}</Headline>
        <Text style={{ color: "white", fontSize: 20 }}>Set {set + 1}</Text>
        <AmountPill
          title={"Reps"}
          amount={12}
          addFunc={() => {}}
          subFunc={() => {}}
        />
        <AmountPill
          title={"Weight"}
          amount={weight}
          addFunc={() => setWeight(weight + 1)}
          subFunc={() => setWeight(weight - 1)}
        />
      </View>

      <TouchableOpacity
        style={{
          paddingVertical: 24,
          alignSelf: "center",
          marginBottom: 50,
          paddingHorizontal: 24,
        }}
      >
        <Text style={{ color: "#FFFFFF" }}>Next Set</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartExercise;
