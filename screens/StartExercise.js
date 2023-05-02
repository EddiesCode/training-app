import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Text, Headline } from "react-native-paper";
import AmountPill from "../components/workout/AmountPill";
import workoutStore from "../store/workoutStore";
import exerciseStore from "../store/exerciseStore";

export const StartExercise = ({ navigation, route }) => {
  const weightArray = Array.from({ length: 2000 }, (_, i) => i / 2 + 0.5).map(
    (value) => ({
      label: value + "kg",
      value: value,
    })
  );

  const repArray = Array.from({ length: 100 }, (_, i) => i + 1).map(
    (value) => ({
      label: value + "",
      value: value,
    })
  );

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
          items={repArray}
          title={"Reps"}
          amount={reps}
          addFunc={() => setReps(reps + 1)}
          subFunc={() => {
            if (reps > 1) setReps(reps - 1);
          }}
          setReps={setReps}
        />
        <AmountPill
          items={weightArray}
          title={"Weight"}
          amount={weight}
          addFunc={() => setWeight(weight + 0.5)}
          subFunc={() => setWeight(weight - 0.5)}
          setWeight={setWeight}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setSet((previousSet) => previousSet + 1);
            setWeight(
              workoutStore.getWorkoutExerciseDefualtWeightById(
                workoutId,
                exerciseId
              )
            );
          }}
          style={styles.buttonSetStyle}
        >
          <Text style={{ color: "#FFFFFF" }}>Next Set</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSet((previousSet) => previousSet + 1);
          }}
          style={styles.buttonSetStyle}
        >
          <Text style={{ color: "#FFFFFF" }}>End Exercise</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartExercise;

const styles = StyleSheet.create({
  buttonSetStyle: {
    backgroundColor: "grey",
    opacity: 0.5,
    paddingVertical: 24,
    alignSelf: "center",
    marginBottom: 50,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
});
