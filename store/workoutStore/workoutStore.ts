import * as crypto from "expo-crypto";

import { makeAutoObservable } from "mobx";
import {
  clearPersistedStore,
  makePersistable,
  stopPersisting,
} from "mobx-persist-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Workout, WorkoutHistoryType } from "./workoutStore.config";

function addWorkout(workouts, workoutName, exercises) {
  return [
    ...workouts,
    {
      id: crypto.randomUUID(),
      name: workoutName,
      exercises,
    },
  ];
}

function deleteWorkout(workouts, workoutId) {
  return workouts.filter((workout) => workout.id !== workoutId);
}

function updateWorkout(
  oldWorkoutArr: Workout[],
  workoutId: string,
  newWorkoutArr: Workout[]
): any[] {
  if (newWorkoutArr.length === 0) {
    return oldWorkoutArr.filter((workout) => workout.id !== workoutId);
  }

  return oldWorkoutArr.map((workout) => {
    if (workout.id !== workoutId) {
      return workout;
    } else {
      return { ...workout, exercises: newWorkoutArr };
    }
  });
}

function updateWorkoutHistoryExercise(
  workoutHistory: WorkoutHistoryType[],
  workout: WorkoutHistoryType
) {
  console.log("history", workoutHistory);
  const found = workoutHistory.find((item) => item.id === workout.id);

  if (!found) {
    return [workout];
  }

  return workoutHistory.map((historyItem) => {
    if (historyItem.id !== workout.id) {
      return historyItem;
    }
    historyItem.exercises.map((historyExercise) => {
      const foundExercise = workout.exercises.find(
        (workoutExercise) => historyExercise.id !== workoutExercise.id
      );
      console.log("++++++++++++", foundExercise);
      console.log("------------", historyExercise);

      if (foundExercise) historyItem.exercises.push(foundExercise);

      return historyExercise;
    });
    return historyItem;
  });
}

class WorkoutStore {
  workouts: Workout[] = [];
  workoutHistory: WorkoutHistoryType[] = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "WorkoutStore",
      properties: ["workouts", "workoutHistory"],
      storage: AsyncStorage,
    });
  }

  addWorkout(workoutName, exercises) {
    this.workouts = addWorkout(this.workouts, workoutName, exercises);
    console.log(this.workouts);
  }

  deleteWorkout(workoutId) {
    this.workouts = deleteWorkout(this.workouts, workoutId);
  }

  getWorkoutById(id) {
    return this.workouts.find((workout) => workout.id === id);
  }

  getWorkoutExerciseDefualtWeightById(workoutId, exerciseId) {
    let workout = this.workouts.find((workout) => workout.id === workoutId);
    let exercise = workout.exercises.find(
      (exercise) => exercise.id === exerciseId
    );

    return exercise.defaultWeight;
  }

  updateWorkout(workoutId, newExerciseArr) {
    this.workouts = updateWorkout(this.workouts, workoutId, newExerciseArr);
  }

  updateWorkoutHistoryExercise(workout: WorkoutHistoryType) {
    this.workoutHistory = updateWorkoutHistoryExercise(
      this.workoutHistory,
      workout
    );
    this.workoutHistory.map((item) =>
      item.exercises.map((estse) => console.log(estse.data))
    );
  }

  stopStore() {
    stopPersisting(this);
  }

  clearStoredData() {
    clearPersistedStore(this);
    this.workouts = [];
    this.workoutHistory = [];
  }
}

const workoutStore = new WorkoutStore();
export default workoutStore;
