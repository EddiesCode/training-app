export interface IExerciseCard {
  id: string;
  workoutId: string;
  exercise: string;
  screen: string;
  selected: boolean;
}

export type NavigationOptions = {
  navigate: (
    name: string,
    params: {
      exerciseName: string;
      exerciseId: string;
      workoutId: string;
    }
  ) => void;
};
