import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Icon } from "@rneui/base";

import { useTheme } from "@react-navigation/native";

const DisplayModeButton = (props) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={styles.sortButton(theme)} onPress={props.onPress}>
      <Icon
        name={props.icon}
        type="material-community"
        size={25}
        color={theme.dark ? "F5F5F5" : "#000000"}
      />
    </TouchableOpacity>
  );
};

export default DisplayModeButton;

const styles = StyleSheet.create({
  sortButton: (theme) => {
    return {
      width: 50,
      height: 50,
      backgroundColor: theme.dark ? "#FFFFFF50" : "#00000020",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
      borderRadius: 15,
    };
  },
});
