import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { globalStyles } from "../../../style/styleGlobal";

const ProfileScreen = () => {
  const functionSatu = (data: any) => {
    console.log("Funciton Satu dipanggil" + data + " asjdasd auo");
  };

  return (
    <View style={globalStyles.pageContainer}>
      <ImageBackground
        source={require("../../../assets/pageAsset/screen-bg.png")}
        style={globalStyles.imageBackground}
      />
      <TouchableOpacity
        onPress={() => {
          functionSatu(" parmet 1");
        }}
        style={{ backgroundColor: "#FFFFFF", height: 200, borderRadius: 50 }}
      >
        <Text>Button APa</Text>
      </TouchableOpacity>
      <Button
        title="Button Pake component Button"
        onPress={() => {
          console.log("Button compoentn dipencet");
        }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  styling1: {
    backgroundColor: "red",
  },
});
