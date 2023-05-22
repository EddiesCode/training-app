import React, { FC } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { useTheme } from "@react-navigation/native";
import exerciseStore from "../../store/exerciseStore";
import { Subheading } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

//config
import { IExerciseCard, NavigationOptions } from "./ExerciseCard.config";

const ExerciseCard: FC<IExerciseCard> = ({
  id,
  workoutId,
  exercise,
  screen,
  selected,
}) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationOptions>();

  const handlePress = (): void => {
    switch (screen) {
      case "CreateWorkout":
        exerciseStore.selectExercise(id, exercise, "");
        break;

      case "StartExercise": {
        navigation.navigate("StartExercise", {
          exerciseName: exercise,
          exerciseId: id,
          workoutId,
        });
        break;
      }

      default:
        console.log(exercise, id);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.defaultCardWrapper,
        {
          borderColor: selected ? theme.colors.primary : "#00000020",
        },
      ]}
      onPress={handlePress}
    >
      <View style={[styles.innerCardWrapper]}>
        <Subheading
          style={[styles.exerciseTitle, { color: theme.colors.text }]}
        >
          {exercise}
        </Subheading>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseCard;

const styles = StyleSheet.create({
  defaultCardWrapper: {
    backgroundColor: "#FFFFFF20",
    height: 150,
    borderWidth: 2,
    borderColor: "#00000020",
    borderRadius: 10,
    justifyContent: "center",
  },
  cardWrapper: {
    backgroundColor: "#FFFFFF20",
    borderWidth: 2,
    borderColor: "#00000020",
    borderRadius: 10,
    justifyContent: "center",
  },
  innerCardWrapper: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  exerciseTitle: {
    fontWeight: "900",
  },
});
