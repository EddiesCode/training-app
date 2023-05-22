import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@react-navigation/native";

import { Paragraph } from "react-native-paper";
import { Button, Icon } from "@rneui/base";
import exerciseStore from "../../store/exerciseStore";

type Props = {
  id: string;
  weight: number;
};

const DefaultWeightInput = ({ id, weight }: Props) => {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <Paragraph
        style={{ fontSize: 16, color: theme.colors.text, alignSelf: "center" }}
      >
        Default weight
      </Paragraph>
      <View style={styles.amountWrapper}>
        <Button
          buttonStyle={styles.buttonDecreaseStyle}
          containerStyle={{
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          }}
          color={"#00000035"}
          icon={<Icon name="remove" size={20} color={"#FFFFFF90"} />}
          onPress={() => exerciseStore.decreaseAmount(id, "weight")}
        />
        <Button
          buttonStyle={[
            styles.amount,
            { backgroundColor: theme.dark ? "#555555" : "#F5F5F5" },
          ]}
        >
          <Paragraph style={{ color: "#FFFFFF" }}>{weight}</Paragraph>
        </Button>
        <Button
          buttonStyle={styles.buttonIncreaseStyle}
          containerStyle={{
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
          color={"#00000035"}
          icon={<Icon name="add" size={20} color={"#FFFFFF90"} />}
          onPress={() => exerciseStore.increaseAmount(id, "weight")}
        />
      </View>
    </View>
  );
};

export default DefaultWeightInput;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
  },
  amountWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonIncreaseStyle: {
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    width: 60,
    height: 40,
  },
  buttonDecreaseStyle: {
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    width: 60,
    height: 40,
  },
  amount: {
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
