import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Overlay } from "@rneui/base";
import { Headline, Text } from "react-native-paper";
import ImagePicker from "./ImagePicker";

import { useTheme } from "@react-navigation/native";

import exerciseStore from "../../store/exerciseStore";
import { observer } from "mobx-react";

const CreateWorkoutModal = ({ visible, setVisible, setSnackbarVisible }) => {
  const theme = useTheme();

  const save = () => {
    exerciseStore.addDefaultExercise();
    setSnackbarVisible(true);
    setVisible(false);
  };

  function AddExercise() {
    return (
      <>
        <Headline style={styles.headerText(theme)}>
          Add custom exercise
        </Headline>
        <TextInput
          placeholder="Enter exercise name..."
          placeholderTextColor={"#FFFFFF40"}
          value={exerciseStore.newExerciseName}
          onChangeText={(text) => exerciseStore.updateNewExerciseName(text)}
          style={styles.workoutNameInput(theme)}
        />
        <ImagePicker />

        <TouchableOpacity
          style={styles.saveButton(exerciseStore.newExerciseName)}
          onPress={save}
          disabled={exerciseStore.newExerciseName === "" ? true : false}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </>
    );
  }

  const AddExerciseObserver = observer(AddExercise);

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={() => {
        setVisible(false);
        exerciseStore.updateNewExerciseName("");
        exerciseStore.updateImage("");
      }}
      overlayStyle={styles.overlayStyle(theme)}
      backdropStyle={{ backgroundColor: "#11111199" }}
      fullScreen={false}
      animationType={"fade"}
    >
      <AddExerciseObserver />
    </Overlay>
  );
};

export default CreateWorkoutModal;

const styles = StyleSheet.create({
  overlayStyle: (theme) => {
    return {
      borderRadius: 10,
      padding: 12,
      width: "70%",
      backgroundColor: theme.colors.card,
      alignItems: "center",
    };
  },
  headerText: (theme) => {
    return {
      marginBottom: 20,
      color: theme.colors.text,
    };
  },
  workoutNameInput: (theme) => {
    return {
      marginBottom: 12,
      paddingHorizontal: 12,
      height: 50,
      fontSize: 20,
      color: theme.colors.text,
      backgroundColor: "#333333",
      width: "100%",
      borderRadius: 5,
    };
  },
  saveButton: (exerciseName) => {
    return {
      marginTop: 12,
      width: "100%",
      height: 50,
      backgroundColor: exerciseName === "" ? "#444444" : "green",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    };
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
