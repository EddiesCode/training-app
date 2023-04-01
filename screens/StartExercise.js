import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, Headline } from "react-native-paper";
import AmountPill from "../components/workout/AmountPill";
import exerciseStore from "../store/exerciseStore";

export const StartExercise = ({ navigation, route }) => {
  const { exerciseName, exerciseId, sets, reps } = route.params;
  console.log(sets, reps);

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
        <Text style={{ color: "white" }}>{sets}</Text>
        <Text style={{ color: "white" }}>{reps}</Text>
        <AmountPill
          title={"Weight"}
          amount={2}
          addFunc={() => {}}
          subFunc={() => {}}
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
