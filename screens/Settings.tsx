import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
  View,
  Text,
} from "react-native";

import { Divider, Icon } from "@rneui/base";

import Alert from "../components/Alert";

import { useTheme } from "@react-navigation/native";

const Settings = () => {
  const theme = useTheme();

  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <ScrollView>
        <Divider
          style={styles.headerDivider}
          subHeader="Storage settings"
          subHeaderStyle={[
            styles.dividerSubHeader,
            { color: theme.colors.text },
          ]}
        />

        <TouchableNativeFeedback onPress={() => setShowAlert(true)}>
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
              Clear local storage
            </Text>

            <Icon
              containerStyle={{ right: 10 }}
              name="delete-outline"
              type="material"
              color={theme.colors.text}
              size={25}
            />
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
      {showAlert && <Alert showAlert={showAlert} setShowAlert={setShowAlert} />}
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  headerDivider: {
    marginTop: 5,
    marginHorizontal: 20,
    width: 0,
  },
  dividerSubHeader: {
    marginBottom: 5,
    marginHorizontal: 15,
    fontSize: 16,
  },
});
