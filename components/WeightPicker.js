import { ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { Button, Overlay } from "@rneui/base";

const WeightPicker = ({ amount, items }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button style={styles.container} onPress={() => setVisible(!visible)}>
        <Text style={{ fontSize: 30 }}>{amount}</Text>
      </Button>
      <Overlay
        isVisible={visible}
        overlayStyle={{
          borderRadius: 10,
          padding: 12,
          width: "70%",
          alignItems: "center",
          maxHeight: 300,
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
            <Text style={{ height: 40 }} key={index}>
              {item.label}
            </Text>
          )}
          getItemLayout={(data, index) => ({
            length: 40,
            offset: 40 * index,
            index,
          })}
          initialScrollIndex={96}
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
