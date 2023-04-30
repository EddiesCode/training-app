import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Button, Overlay } from "@rneui/base";

const WeightPicker = ({ amount, items, setWeight }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button style={styles.container} onPress={() => setVisible(!visible)}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>{amount}</Text>
      </Button>
      <Overlay
        isVisible={visible}
        overlayStyle={{
          borderRadius: 10,
          padding: 12,
          width: "70%",
          alignItems: "center",
          maxHeight: 400,
        }}
        onBackdropPress={() => setVisible(false)}
      >
        <FlatList
          style={{
            backgroundColor: "#555",
            width: "100%",
            height: "100%",
          }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
          data={items}
          renderItem={({ item, index }) => (
            <Text
              style={{ height: 80, fontSize: 20, fontWeight: "bold" }}
              key={index}
              onPress={() => {
                setWeight(Number(item.value));
                setVisible(false);
              }}
            >
              {item.label}
            </Text>
          )}
          getItemLayout={(data, index) => ({
            length: 80,
            offset: 80 * index,
            index: index,
          })}
          initialScrollIndex={amount + amount - 3}
          snapToAlignment="start"
          snapToInterval={80}
          decelerationRate="normal"
        />
      </Overlay>
    </>
  );
};

// Always 4 number under for item to be placed in middle

export default WeightPicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
});
