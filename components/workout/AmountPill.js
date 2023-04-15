import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { Paragraph } from "react-native-paper";
import { Button } from "@rneui/base";

import WeightPicker from "../WeightPicker";
import DropDownPicker from "react-native-dropdown-picker";

const AmountPill = ({ title, amount, addFunc, subFunc }) => {
  const theme = useTheme();

  const [items, _] = useState(() => {
    return Array.from({ length: 2000 }, (_, i) => i / 2 + 0.5).map((value) => ({
      label: value + "kg",
      value: value,
    }));
  }, []);

  return (
    <View style={styles.setsAndRepsWrapper}>
      <View style={styles.innerInnerCardWrapper}>
        <View style={styles.setsAndRepsText(theme)}>
          <Paragraph style={{ fontSize: 16, color: theme.colors.text }}>
            {title}
          </Paragraph>
        </View>
        <View style={styles.setsAndRepsAmount}>
          <Button
            buttonStyle={styles.buttonDecreaseStyle}
            containerStyle={{
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
            color={"#00000035"}
            icon={<Icon name="remove" size={30} color={"#FFFFFF"} />}
            onPress={subFunc}
          />
          <WeightPicker amount={amount} items={items} />
          <Button
            buttonStyle={styles.buttonIncreaseStyle}
            containerStyle={{
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
            color={"#00000035"}
            icon={<Icon name="add" size={30} color={"#FFFFFF"} />}
            onPress={addFunc}
          />
        </View>
      </View>
    </View>
  );
};

export default AmountPill;

const styles = StyleSheet.create({
  buttonIncreaseStyle: {
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  buttonDecreaseStyle: {
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  cardWrapper: (theme, rightMargin) => {
    return {
      backgroundColor: theme.dark ? "#FFFFFF20" : "#00000020",
      flex: 0.5,
      marginRight: rightMargin(),
      borderWidth: 2,
      borderColor: "#00000020",
      borderRadius: 10,
      justifyContent: "center",
    };
  },
  innerCardWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "red",
  },
  setsAndRepsWrapper: {
    justifyContent: "center",
  },
  innerInnerCardWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  setsAndRepsText: (theme) => {
    return {
      color: theme.colors.text,
    };
  },
  setsAndRepsAmount: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: (theme) => {
    return {
      backgroundColor: theme.dark ? "#FFFFFF30" : "#00000015",
      alignItems: "center",
      justifyContent: "center",
    };
  },
  amount: (theme) => {
    return {
      backgroundColor: theme.dark ? "#555555" : "#F5F5F5",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 30,
      paddingHorizontal: 30,
      borderWidth: 0,
    };
  },
});
