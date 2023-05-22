import React from "react";
import { View, FlatList, Text } from "react-native";
import { Headline } from "react-native-paper";
import AnimatedLottieView from "lottie-react-native";
import { Observer } from "mobx-react";
import { useTheme } from "@react-navigation/native";

import WorkoutCard from "./WorkoutCard";

import exerciseStore from "../../store/exerciseStore";

const UpdateExercises = () => {
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
          Enter default weight
        </Headline>
      </View>
      {exerciseStore.exercises.length === 0 && (
        <Observer>
          {() => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <AnimatedLottieView
                autoPlay
                style={{ width: "75%" }}
                source={require("../../../assets/lottie-animations/29951-healthy-lifestyle-exercise.json")}
              />
              <Text style={{ fontSize: 20, color: theme.colors.text }}>
                No exercises added
              </Text>
            </View>
          )}
        </Observer>
      )}
      {exerciseStore.exercises.length > 0 && (
        <Observer>
          {() => (
            <FlatList
              contentContainerStyle={{
                marginHorizontal: 10,
                paddingBottom: 10,
              }}
              ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
              data={exerciseStore.exercises.slice()}
              numColumns={2}
              renderItem={({ item, index }) => (
                <WorkoutCard
                  id={item.id}
                  key={item.id}
                  index={index}
                  numColumns={2}
                  exercise={item.exercise}
                  weight={item.defaultWeight}
                />
              )}
            />
          )}
        </Observer>
      )}
    </>
  );
};

export default UpdateExercises;
