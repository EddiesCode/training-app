import { Set } from "../../screens/StartExercise/StartExercise.config";
import { Exercise } from "../exerciseStore/exerciseStore.config";

export type Workout = {
  exercises: Exercise[],
  id: string,
  name: string,
};

export type WorkoutHistoryType = {
  id: string,
  date: string,
  exercises: {
    id: string,
    data: Set[],
  }[],
};
