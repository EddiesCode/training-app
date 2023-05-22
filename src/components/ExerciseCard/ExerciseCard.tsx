import React, { FC } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Subheading } from "react-native-paper";
import { Icon } from "@rneui/base";

import exerciseStore from "../../store/exerciseStore";

//config
import { IExerciseCard, NavigationOptions } from "./ExerciseCard.config";

import DefaultWeightInput from "../DefaultWeightInput/DefaultWeightInput";

const ExerciseCard: FC<IExerciseCard> = ({
  id,
  workoutId,
  exercise,
  screen,
  selected,
  isUpdating,
  weight,
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

  const ExerciseTitle = () => {
    return (
      <Subheading style={[styles.exerciseTitle, { color: theme.colors.text }]}>
        {exercise}
      </Subheading>
    );
  };

  const DeleteButton = () => {
    return (
      <Icon
        color={"#b71c1c"}
        name="delete-outline"
        size={30}
        style={{
          alignSelf: "center",
        }}
        onPress={() => exerciseStore.deleteExercise(id)}
      />
    );
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
        <View
          style={[styles.titleWrapper, { marginBottom: isUpdating ? 10 : 0 }]}
        >
          <ExerciseTitle />
          {isUpdating && <DeleteButton />}
        </View>
        {isUpdating && <DefaultWeightInput id={id} weight={weight} />}
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseCard;

const styles = StyleSheet.create({
  defaultCardWrapper: {
    backgroundColor: "#FFFFFF20",
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
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  exerciseTitle: {
    fontWeight: "900",
  },
});
