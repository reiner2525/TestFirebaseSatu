import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../../style/styleGlobal";

const MyVouchersScreen = () => {
  return (
    <View style={globalStyles.pageContainer}>
      <ImageBackground
        source={require("../../../assets/pageAsset/screen-bg.png")}
        style={globalStyles.imageBackground}
      />
    </View>
  );
};

export default MyVouchersScreen;

const styles = StyleSheet.create({});
