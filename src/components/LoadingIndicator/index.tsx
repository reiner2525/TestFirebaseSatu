import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
const screen = Dimensions.get("screen");
const LoadingIndicator = () => {
  return (
    <View style={styles.pageOverlay}>
      <Text>LoadingIndicator</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  pageOverlay: {
    position: "absolute",
    top: 0,
    backgroundColor: "red",
    width: screen.width,
    heigth: screen.height,
  },
});
