import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../App";
import { BinCard } from "../../components/";
import { globalStyles } from "../../../style/styleGlobal";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  Firestore,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

const screen = Dimensions.get("screen");
const ExploreScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [binData, setBinData] = useState(null);
  const [isBinListRefreshing, setIsBinListRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setIsBinListRefreshing(true);
    try {
      const binCollection = collection(db, "bins");
      const binSnapshot = await getDocs(binCollection);
      const binList = binSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const binIdList = binSnapshot.docs.map((doc) => doc.id);
      console.log(binList);
      setBinData(binList);
    } catch (e) {
      Alert.alert("ERROR WHLIE FETCHING FIREBASE!", e.message);
    }
    setIsBinListRefreshing(false);
  };

  return (
    <KeyboardAvoidingView style={globalStyles.pageContainer}>
      <ImageBackground
        source={require("../../../assets/pageAsset/screen-bg.png")}
        style={globalStyles.imageBackground}
      />
      <View style={styles.searchBarContainer}>
        <Ionicons name="search-outline" style={{ fontSize: 24 }} />
        <TextInput onChangeText={() => {}} placeholder="search bin..." />
      </View>

      <ScrollView>
        {binData ? (
          binData.map((datas: any, key: string) => (
            <BinCard
              binName={datas.binName}
              key={key}
              binUniqueCode={datas.id}
              binImageUrl={datas.imageLocationURL}
              binAddress={datas.binAddress}
              binNotes={datas.binNotes}
            />
          ))
        ) : (
          <ActivityIndicator size={"large"} />
        )}
      </ScrollView>

      {/* <FlatList
        style={{ width: "100%", backgroundColor: "red" }}
        key={"_"}
        data={dummyData}
        renderItem={({ item }) => (
          <BinCard binName={item.binName} binUniqueCode={item.uniqueCode} />
        )}
        numColumns={2}
        refreshControl={
          <RefreshControl
            refreshing={isBinListRefreshing}
            onRefresh={getData}
          />
        }
      /> */}
    </KeyboardAvoidingView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    elevation: 1,
    height: screen.height * 0.05,
    width: screen.width * 0.5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    height: screen.height * 0.05,
    alignItems: "center",
    paddingStart: 15,
  },
});
