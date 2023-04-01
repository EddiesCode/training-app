import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Observer } from "mobx-react";
import workoutStore from "../store/workoutStore";
import { Headline, Paragraph, Caption, Divider } from "react-native-paper";
import { Icon } from "@rneui/base";

import AnimatedLottieView from "lottie-react-native";

const Workouts = ({ navigation, route }) => {
  const { screenType } = route.params;

  function onPressAction(item) {
    console.log(item.name, item.id);
    switch (screenType) {
      case "edit": {
        navigation.navigate("EditWorkout", {
          workoutId: item.id,
          workoutName: item.name,
        });
        break;
      }
      case "start": {
        navigation.navigate("SelectExercise", {
          workoutId: item.id,
          workoutName: item.name,
        });
        break;
      }
      default:
        break;
    }
  }

  return (
    <Observer>
      {() => (
        <>
          {workoutStore.workouts.length !== 0 && (
            <FlatList
              contentContainerStyle={{
                padding: 10,
              }}
              data={workoutStore.workouts.slice()}
              scrollEnabled
              renderItem={({ item }) => (
                <>
                  <TouchableOpacity
                    style={styles.listItemStyle}
                    onPress={() => onPressAction(item)}
                  >
                    <View style={{}}>
                      <Headline style={{ alignSelf: "center" }}>
                        {item.name}
                      </Headline>
                      <Caption style={{ alignSelf: "center" }}>
                        Number of exercises: {item.exercises.length}
                      </Caption>
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        right: 20,
                      }}
                    >
                      <Icon
                        name={
                          screenType === "edit"
                            ? "edit"
                            : screenType === "start"
                            ? "play"
                            : null
                        }
                        type="antdesign"
                        size={30}
                      />
                    </View>
                  </TouchableOpacity>
                  <Divider />
                </>
              )}
            />
          )}
          {workoutStore.workouts.length === 0 && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <AnimatedLottieView
                autoPlay
                style={{ width: "75%" }}
                source={require("../assets/lottie-animations/29951-healthy-lifestyle-exercise.json")}
              />
              <Paragraph style={{ color: "#FFFFFF" }}>
                No workouts added
              </Paragraph>
            </View>
          )}
        </>
      )}
    </Observer>
  );
};

export default Workouts;

const styles = StyleSheet.create({
  listItemStyle: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "lightgray",
  },
});
