export interface IExerciseCard {
  id: string;
  exercise: string;
  screen: string;
  selected: boolean;
  isUpdating: boolean;
  workoutId?: string;
  weight?: number;
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
