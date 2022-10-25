import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../App";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colorGlobal } from "../../../style/colorGlobal";

interface BinCardProps {
  binName: string;
  binUniqueCode: string;
  binImageUrl: string;
  binAddress: string;
  binNotes: string;
}

const screen = Dimensions.get("screen");

const BinCard: FC<BinCardProps> = (props): JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate("BinDetails", {
          binName: props.binName,
          binUniqueCode: props.binUniqueCode,
          binImageUrl: props.binImageUrl,
          binAddress: props.binAddress,
          binNotes: props.binNotes,
        });
      }}
    >
      <Image
        source={require("../../../assets/nearest-bin-pic.png")}
        style={{ height: screen.height * 0.05, width: screen.height * 0.05 }}
      />
      <View style={{ marginStart: 10, flex: 9 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }} numberOfLines={1}>
          {props.binName}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={1}>
          {props.binAddress}
        </Text>
      </View>
      <View
        style={{ justifyContent: "center", flex: 1, alignItems: "flex-end" }}
      >
        <Ionicons
          name="arrow-forward-circle-outline"
          style={{ fontSize: 20 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default BinCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colorGlobal.SECONDARY2_GREEN,
    elevation: 1,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
  },
});
