import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";

import { CheckBox, Icon } from "@rneui/base";

import { useTheme } from "@react-navigation/native";

const ThemeListItem = (props) => {
  const theme = useTheme();

  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 25,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            paddingVertical: 16,
            color: theme.colors.text,
          }}
        >
          {props.text}
        </Text>
        <CheckBox
          containerStyle={{
            backgroundColor: "transparent",
            padding: 0,
          }}
          checkedIcon={
            <Icon
              name="radio-button-checked"
              type="material"
              color={theme.colors.primary}
              size={25}
            />
          }
          uncheckedIcon={
            <Icon
              name="radio-button-unchecked"
              type="material"
              color={theme.colors.text}
              size={25}
            />
          }
          checked={props.checked}
          onPress={props.onPress}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

export default ThemeListItem;

const styles = StyleSheet.create({});
