export type WorkoutHistoryType = {
  id: string,
  date: Date,
  exercise: {
    id: string,
    data: {
      sets: Array<number>,
      reps: Array<number>,
      weight: Array<number>,
    },
  }[],
};
