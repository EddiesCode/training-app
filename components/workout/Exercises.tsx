import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Headline } from "react-native-paper";

import ExerciseCard from "../ExerciseCard/ExerciseCard";

import { Observer } from "mobx-react";
import exerciseStore from "../../store/exerciseStore";

import { useTheme } from "@react-navigation/native";

const Exercises = ({ exercises, workoutId, screen }) => {
  const theme = useTheme();

  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          alignItems: "center",
        }}
      >
        <Headline style={{ color: theme.colors.text, marginVertical: 10 }}>
          Select exercises
        </Headline>
      </View>
      <Observer>
        {() => (
          <FlatList
            contentContainerStyle={{
              marginHorizontal: 10,
            }}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            data={
              screen === "CreateWorkout"
                ? exerciseStore.defaultExercises.slice()
                : exercises
            }
            numColumns={2}
            key={2}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.cardWrapper,
                  { marginRight: index % 2 !== 0 ? 0 : 5 },
                ]}
              >
                <ExerciseCard
                  id={item.id}
                  screen={screen}
                  exercise={item.exercise}
                  selected={item.selected}
                  workoutId={workoutId}
                />
              </View>
            )}
          />
        )}
      </Observer>
    </>
  );
};

export default Exercises;

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 0.5,
  },
});
