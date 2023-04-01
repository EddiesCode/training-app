import * as crypto from "expo-crypto";

import { makeAutoObservable } from "mobx";
import { makePersistable, stopPersisting } from "mobx-persist-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

function addWorkout(workouts, workoutName, exercises) {
  return [
    ...workouts,
    {
      id: crypto.randomUUID(),
      name: workoutName,
      exercises: exercises,
    },
  ];
}

function deleteWorkout(workouts, workoutId) {
  return workouts.filter((workout) => workout.id !== workoutId);
}

function updateWorkout(oldWorkoutArr, workoutId, newWorkoutArr) {
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

class WorkoutStore {
  workouts = [];
  workoutHistory = [];

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

  updateWorkout(workoutId, newExerciseArr) {
    this.workouts = updateWorkout(this.workouts, workoutId, newExerciseArr);
  }

  stopStore() {
    stopPersisting(this);
  }
}

const workoutStore = new WorkoutStore();
export default workoutStore;
