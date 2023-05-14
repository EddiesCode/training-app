import React, { ReactElement } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Title } from "react-native-paper";

const HomeScreenButton = ({ screen, text, theme, type }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        { backgroundColor: theme.dark ? theme.colors.card : "#FFFFFF" },
      ]}
      onPress={() => {
        navigation.navigate(screen, {
          title: text,
          screenType: type,
        });
      }}
    >
      <Title style={{ color: theme.colors.text }}>{text}</Title>
    </TouchableOpacity>
  );
};

export default HomeScreenButton;

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
