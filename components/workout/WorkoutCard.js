import React from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";

import { useTheme } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import exerciseStore from "../../store/exerciseStore/exerciseStore";
import { Subheading, Paragraph } from "react-native-paper";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import EnterSets, { openAlert } from "../EnterSets";

const WorkoutCard = ({
  id,
  workoutId,
  exercise,
  index,
  numColumns,
  screen,
  selected,
  deleteExercise,
  increaseAmount,
  decreaseAmount,
  weight,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();

  function rightMargin() {
    switch (numColumns) {
      case 1:
        return 0;
      case 2:
        return index % 2 !== 0 ? 0 : 5;
      default:
        return 0;
    }
  }

  if (screen === "CreateWorkout" || screen === "SelectExercise") {
    return (
      <TouchableOpacity
        style={[
          styles.defaultCardWrapper(theme, rightMargin),
          {
            borderColor: selected ? theme.colors.primary : "#00000020",
          },
        ]}
        onPress={() => {
          if (screen === "CreateWorkout")
            exerciseStore.selectExercise(id, exercise, "");
          else if (screen === "SelectExercise") {
            navigation.navigate("StartExercise", {
              exerciseName: exercise,
              exerciseId: id,
              workoutId,
              openModal: true,
            });
          } else console.log(exercise, id);
        }}
      >
        <View style={[styles.innerCardWrapper]}>
          <Subheading style={styles.exerciseTitle(theme)}>
            {exercise}
          </Subheading>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.cardWrapper(theme, rightMargin)}>
      <View style={styles.innerCardWrapper}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Subheading style={styles.exerciseTitle(theme)}>
            {exercise}
          </Subheading>
          <Icon
            color={"#b71c1c"}
            name="delete-outline"
            size={30}
            style={{
              alignSelf: "center",
            }}
            onPress={() => {
              if (screen !== "edit") {
                exerciseStore.selectExercise(id);
                console.log(exerciseStore.exercises);
              } else {
                deleteExercise(id);
              }
            }}
          />
        </View>
        <View style={styles.setsAndRepsWrapper}>
          <View style={styles.innerInnerCardWrapper}>
            <View style={styles.setsAndRepsText(theme)}>
              <Paragraph style={{ fontSize: 16, color: theme.colors.text }}>
                Default weight
              </Paragraph>
            </View>
            <View style={styles.setsAndRepsAmount}>
              <Button
                buttonStyle={styles.buttonDecreaseStyle}
                containerStyle={{
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                }}
                color={"#00000035"}
                icon={<Icon name="remove" size={20} color={"#FFFFFF90"} />}
                onPress={() => {
                  if (screen !== "edit") {
                    exerciseStore.decreaseAmount(id, "weight");
                  } else {
                    decreaseAmount(id, "weight");
                  }
                }}
              />
              <Button buttonStyle={styles.amount(theme)}>
                <Paragraph
                  style={[styles.paragraphStyle, { color: "#FFFFFF" }]}
                >
                  {weight}
                </Paragraph>
              </Button>
              <Button
                buttonStyle={styles.buttonIncreaseStyle}
                containerStyle={{
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                }}
                color={"#00000035"}
                icon={<Icon name="add" size={20} color={"#FFFFFF90"} />}
                onPress={() => {
                  if (screen !== "edit") {
                    exerciseStore.increaseAmount(id, "weight");
                  } else {
                    increaseAmount(id, "weight");
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkoutCard;

const styles = StyleSheet.create({
  buttonIncreaseStyle: {
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    width: 60,
    height: 40,
  },
  buttonDecreaseStyle: {
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    width: 60,
    height: 40,
  },
  defaultCardWrapper: (theme, rightMargin) => {
    return {
      backgroundColor: theme.dark ? "#FFFFFF20" : "#00000020",
      height: 150,
      flex: 0.5,
      marginRight: rightMargin(),
      borderWidth: 2,
      borderColor: "#00000020",
      borderRadius: 10,
      justifyContent: "center",
    };
  },
  cardWrapper: (theme, rightMargin) => {
    return {
      backgroundColor: theme.dark ? "#FFFFFF20" : "#00000020",
      flex: 0.5,
      marginRight: rightMargin(),
      borderWidth: 2,
      borderColor: "#00000020",
      borderRadius: 10,
      justifyContent: "center",
    };
  },
  innerCardWrapper: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  exerciseTitle: (theme) => {
    return {
      color: theme.colors.text,
      fontWeight: "900",
    };
  },
  setsAndRepsWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  innerInnerCardWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  setsAndRepsText: (theme) => {
    return {
      color: theme.colors.text,
    };
  },
  setsAndRepsAmount: {
    flex: 1,
    //justifyContent: "center",
    // height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  button: (theme) => {
    return {
      backgroundColor: theme.dark ? "#FFFFFF30" : "#00000015",
      alignItems: "center",
      justifyContent: "center",
      // height: "100%",
      width: 40,
    };
  },
  amount: (theme) => {
    return {
      width: 60,
      height: 40,
      backgroundColor: theme.dark ? "#555555" : "#F5F5F5",
      alignItems: "center",
      justifyContent: "center",
    };
  },
  buttonText: (theme) => {
    return {
      color: theme.colors.text,
    };
  },
});
