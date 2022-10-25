import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
const screen = Dimensions.get("screen");
export const globalStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  textInput: {
    height: screen.height * 0.07,
    borderRadius: 10,
    backgroundColor: "#F3F3F3",
    marginBottom: 10,
    padding: 10,
  },
  imageBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
