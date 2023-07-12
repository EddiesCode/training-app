import * as crypto from "expo-crypto";

import { makeAutoObservable } from "mobx";
import { defaultData } from "../../assets/defaultData";
import { makePersistable, clearPersistedStore } from "mobx-persist-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

function addDefaultExercise(exercises, exerciseName, image) {
  return [
    ...exercises,
    {
      id: crypto.randomUUID(),
      exercise: exerciseName,
      image: image,
      selected: false,
    },
  ];
}

function selectExercise(exercises, id) {
  return exercises.map((exercise) => {
    if (exercise.id !== id) return exercise;
    return { ...exercise, selected: !exercise.selected };
  });
}

function deleteExercise(exercises, id) {
  return exercises.filter((exercise) => exercise.id !== id);
}

function increaseAmount(exercises, id, type) {
  return exercises.map((exercise) => {
    if (exercise.id !== id) return exercise;
    switch (type) {
      case "weight":
        return { ...exercise, defaultWeight: exercise.defaultWeight + 1 };
      default:
        return { ...exercise };
    }
  });
}

function decreaseAmount(exercises, id, type) {
  return exercises.map((exercise) => {
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
  });
}

class ExerciseStore {
  defaultExercises = [];
  exercises = [];
  newExerciseName = "";
  newImage = null;
  snackBarText = "";

  constructor(data) {
    this.defaultExercises = data;
    makeAutoObservable(this);
    makePersistable(this, {
      name: "ExerciseStore",
      properties: ["defaultExercises"],
      storage: AsyncStorage,
    });
  }

  updateNewExerciseName(text) {
    this.newExerciseName = text;
  }

  updateSnackBarText(name) {
    this.snackBarText = name;
  }

  updateImage(image) {
    this.newImage = image;
  }

  addDefaultExercise() {
    this.defaultExercises = addDefaultExercise(
      this.defaultExercises,
      this.newExerciseName,
      this.newImage
    );
    this.snackBarText = this.newExerciseName;
    this.newExerciseName = "";
    this.newImage = null;
  }

  selectExercise(exerciseId, exerciseName, image) {
    this.defaultExercises = selectExercise(this.defaultExercises, exerciseId);

    const found = this.exercises.find((exercise) => exercise.id === exerciseId);
    if (!found) {
      this.exercises.push({
        id: exerciseId,
        exercise: exerciseName,
        image: image,
        defaultWeight: 0,
      });
    } else {
      this.exercises = deleteExercise(this.exercises, exerciseId);
    }
    console.log(this.exercises);
  }

  deleteExercise(id) {
    this.exercises = deleteExercise(this.exercises, id);
  }

  increaseAmount(id, type) {
    this.exercises = increaseAmount(this.exercises, id, type);
  }

  decreaseAmount(id, type) {
    this.exercises = decreaseAmount(this.exercises, id, type);
  }

  deleteAddedExercises() {
    this.exercises = [];
    this.defaultExercises = this.defaultExercises.map((exercise) => {
      return { ...exercise, selected: false };
    });
  }

  clearStoredData() {
    clearPersistedStore(this);
    this.defaultExercises = defaultData;
  }
}

const exerciseStore = new ExerciseStore(defaultData);
export default exerciseStore;
