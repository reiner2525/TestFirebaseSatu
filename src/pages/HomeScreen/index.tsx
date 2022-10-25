import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../App";
import { globalStyles } from "../../../style/styleGlobal";
import { db } from "../../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { colorGlobal } from "../../../style/colorGlobal";
import { SliderBox } from "react-native-image-slider-box";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BinCard } from "../../components";

const screen = Dimensions.get("screen");
const HomeScreen = ({ navigation }) => {
  // const navigation =
  //   useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [nearestBinData, setNearestBinData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const voucherImageDummy = [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree",
  ];
  const voucherImageDummyyy = [require("../../../assets/profile-picture.png")];

  const nearestBinDummyData = [
    {
      binName: "Anggrek Bin",
      binAddress: "Jalan Anggrek no.1 (near Alfamart)",
    },
    {
      binName: "Syahdan Bin",
      binAddress: "Jalan Kyai Haji Syahdan no. 14 (beside portal)",
    },
    {
      binName: "Kijang 1 Bin",
      binAddress: "Besides Warung Upnormal",
    },
    {
      binName: "Kijang 2 Bin",
      binAddress: "In front of BINUS Kijang",
    },
    {
      binName: "Kijang 3 Bin",
      binAddress: "Besides Warung Upnormal",
    },
    {
      binName: "Kijang 4 Bin",
      binAddress: "In front of BINUS Kijang",
    },
    {
      binName: "Kijang 5 Bin",
      binAddress: "Besides Warung Upnormal",
    },
    {
      binName: "Kijang 6 Bin",
      binAddress: "In front of BINUS Kijang",
    },
  ];

  const getData = async () => {
    try {
      const binCollection = collection(db, "bins");
      const binSnapshot = await getDocs(binCollection);
      const binList = binSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(binList);
      setNearestBinData(binList);
    } catch (e) {
      Alert.alert("ERROR WHLIE FETCHING FIREBASE!", e.message);
    }
  };
  return (
    <KeyboardAvoidingView style={[globalStyles.pageContainer, {}]}>
      <ImageBackground
        source={require("../../../assets/pageAsset/screen-bg.png")}
        style={globalStyles.imageBackground}
      />
      {/* HEADER (PROFILE TOUCHABLE) */}
      <TouchableOpacity
        style={{ flexDirection: "row", marginTop: screen.height * 0.05 }}
        onPress={() => navigation.navigate("Profile", {})}
      >
        <View>
          <Image
            source={require("../../../assets/profile-picture.png")}
            style={{
              height: screen.height * 0.1,
              width: screen.height * 0.1,
            }}
          />
          <Text style={globalStyles.title}>Hi, Song!</Text>
          <Text>Have you dump your trash today?</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text>My Quota</Text>
          <Text style={{ fontWeight: "bold", fontSize: 44 }}>3</Text>
        </View>
      </TouchableOpacity>

      {/* Vouchers and Point */}
      <TouchableOpacity
        style={styles.pointAndVoucherContainer}
        onPress={() => navigation.navigate("Vouchers", {})}
      >
        <View style={{ flex: 2 }}>
          {/* <SliderBox
            images={voucherImageDummy}
            styles={{
              height: "100%",
              width: "100%",
            }}
          /> */}
          <Image
            source={{ uri: voucherImageDummy[0] }}
            style={{
              width: "100%",
              height: screen.height * 0.13,
              borderRadius: 20,
            }}
          />
        </View>
        <View style={{ flex: 1, marginStart: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>845 Point(s)</Text>
          <Text>EXPIRE</Text>
          <Text style={{ fontWeight: "bold" }}>08/24</Text>
        </View>
      </TouchableOpacity>

      {/* NEAREST BIN CONTAINER */}
      <View style={styles.nearestBinContainer}>
        <Text style={globalStyles.title}>Nearest Bin</Text>
        <TouchableOpacity
          style={{ alignItems: "flex-end", marginBottom: 5 }}
          onPress={() => navigation.navigate("Explore", {})}
        >
          <Text>see more...</Text>
        </TouchableOpacity>
        {/* <FlatList
          data={nearestBinDummyData}
          renderItem={(datas: any, key: string) => (
            <BinCard
              binName={datas.binName}
              key={key}
              binUniqueCode={datas.id}
              binImageUrl={datas.imageLocationURL}
              binAddress={datas.binAddress}
              binNotes={datas.binNotes}
            />
          )}
        /> */}

        <ScrollView>
          {nearestBinData &&
            nearestBinData.map((datas: any, key: any) => (
              <BinCard
                binName={datas.binName}
                binUniqueCode={datas.id + key}
                binImageUrl={datas.imageLocationURL}
                binAddress={datas.binAddress}
                binNotes={datas.binNotes}
              />
            ))}
        </ScrollView>
      </View>

      {/* BOTTOM BUTTON CONTAINER */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={[styles.button, { flex: 1 }]}
          onPress={() => {
            navigation.navigate("AddBin");
          }}
        >
          <Text>Register Bin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { flex: 1 }]}
          onPress={() => {
            navigation.navigate("AddBin");
          }}
        >
          <Text>Dump</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colorGlobal.SECONDARY1_GREEN,
    elevation: 1,
    height: screen.height * 0.05,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  nearestBinContainer: {
    backgroundColor: colorGlobal.SECONDARY1_GREEN,
    marginTop: screen.height * 0.02,
    flex: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  bottomButtonsContainer: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
  },
  pointAndVoucherContainer: {
    flexDirection: "row",
    elevation: 1,
    backgroundColor: colorGlobal.SECONDARY1_GREEN,
    borderRadius: 15,
    padding: 15,
  },
});
