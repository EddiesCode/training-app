import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Headline } from "react-native-paper";

import WorkoutCard from "./WorkoutCard";

import { Observer } from "mobx-react";
import exerciseStore from "../../store/exerciseStore";

import { useTheme } from "@react-navigation/native";

const Exercises = ({ exercises, screen }) => {
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
              <WorkoutCard
                id={item.id}
                index={index}
                numColumns={2}
                screen={screen}
                exercise={item.exercise}
                selected={item.selected}
                sets={item.sets}
                reps={item.reps}
              />
            )}
          />
        )}
      </Observer>
    </>
  );
};

export default Exercises;

const styles = StyleSheet.create({});
