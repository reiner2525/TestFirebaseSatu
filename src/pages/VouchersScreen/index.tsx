import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../../style/styleGlobal";

const VouchersScreen = () => {
  return (
    <View style={globalStyles.pageContainer}>
      <ImageBackground
        source={require("../../../assets/pageAsset/screen-bg.png")}
        style={globalStyles.imageBackground}
      />
    </View>
  );
};

export default VouchersScreen;

const styles = StyleSheet.create({});
