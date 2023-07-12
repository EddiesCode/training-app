import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { Title } from "react-native-paper";

import workoutStore from "../../store/workoutStore/workoutStore";
import { Observer } from "mobx-react";

import { useTheme } from "@react-navigation/native";

const History = () => {
  const theme = useTheme();
  return (
    <Observer>
      {() => (
        <FlatList
          contentContainerStyle={{
            marginHorizontal: 10,
            marginVertical: 10,
            borderRadius: 10,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          data={workoutStore.workoutHistory.slice()}
          numColumns={2}
          key={2}
          renderItem={({ item, index }) => (
            <Title
              style={{
                backgroundColor: theme.colors.card,
                width: "100%",
                paddingVertical: 12,
                paddingHorizontal: 12,
                color: theme.colors.text,
                borderRadius: 10,
              }}
            >
              {item.date}
            </Title>
          )}
        />
      )}
    </Observer>
  );
};

export default History;

const styles = StyleSheet.create({});
