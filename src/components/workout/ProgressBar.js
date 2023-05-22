import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";

import { useTheme } from "@react-navigation/native";

const ProgressBar = ({ currentStepIndex }) => {
  const theme = useTheme();

  return (
    <View style={styles.progressBar}>
      <View style={[styles.line, { backgroundColor: theme.colors.primary }]} />
      <View
        style={[
          styles.line,
          {
            backgroundColor:
              currentStepIndex >= 1 ? theme.colors.primary : theme.colors.card,
          },
        ]}
      />
      <View
        style={[
          styles.line,
          {
            backgroundColor:
              currentStepIndex >= 2 ? theme.colors.primary : theme.colors.card,
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    height: 4,
    flexDirection: "row",
  },
  line: {
    width: Dimensions.get("screen").width / 3,
    height: "100%",
  },
});
