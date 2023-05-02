import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Button, Overlay } from "@rneui/base";

const WeightPicker = ({ amount, items, setWeight }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setVisible(!visible)}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {amount}
        </Text>
      </TouchableOpacity>
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
          initialScrollIndex={
            items.length > 100 ? amount + amount - 3 : amount - 3
          }
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
  button: {
    backgroundColor: "grey",
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
  },
});
