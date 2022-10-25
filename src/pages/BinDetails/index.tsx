import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../App";
import { globalStyles } from "../../../style/styleGlobal";
import { auth, db, storage } from "../../../firebase";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Ionicons from "react-native-vector-icons/Ionicons";

interface BinDetailsProps
  extends NativeStackScreenProps<RootStackParams, "BinDetails"> {
  binName: string;
  binUniqueCode: string;
  binImageUrl: string;
  binAddress: string;
  binNotes: string;
}

const screen = Dimensions.get("screen");

const BinDetailsScreen: FC<BinDetailsProps> = ({
  route,
}: BinDetailsProps): JSX.Element => {
  const [user, setUser] = useState(null);
  const [binHistory, setBinHistory] = useState([]);
  const [binImage, setBinImage] = useState(null);

  useEffect(() => {
    console.log("Bin Details Use Effect");
    getUserDetails();
    getBinHistory();
    downloadBinImage();
    console.log("Bin Image URL: " + route.params.binImageUrl);
  }, []);

  const getUserDetails = () => {
    const userFetched = auth.currentUser;

    if (userFetched) {
      console.log(userFetched.email);
    } else {
      console.log("No User Found");
    }

    setUser(userFetched);
  };

  const throwBin = async () => {
    try {
      const binCollRef = collection(db, "bins");
      const docRef = doc(binCollRef, route.params.binUniqueCode);
      const historyCollRef = collection(docRef, "binHistory");
      await addDoc(historyCollRef, {
        actId: "binDumping",
        userEmail: user.email,
        dtmCreated: new Date().toLocaleString(),
      });

      Alert.alert("Success!", "Success dumping bin here");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const getBinHistory = () => {
    try {
      const binCollRef = collection(db, "bins");
      const docRef = doc(binCollRef, route.params.binUniqueCode);
      const historyCollRef = collection(docRef, "binHistory");
      const a = query(binCollRef, orderBy("binName"), limit(3));

      const unsub = onSnapshot(historyCollRef, (collSnapshot) => {
        const histories = [];
        collSnapshot.forEach((doc) => {
          histories.push(doc.data());
        });

        setBinHistory(histories);
        // console.log("Bin History = " + JSON.stringify(histories));
        // console.log("\n\n A = " + JSON.stringify(a));
      });

      // console.log(unsub);
      // Alert.alert("Success!", 'Success Fetched bin history");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const downloadBinImage = async () => {
    const imageRef = ref(storage, route.params.binImageUrl);

    getDownloadURL(imageRef)
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        setBinImage(url);
        console.log(url);
      })
      .catch((error) => {
        // Handle any errors
        Alert.alert("Error", error.message);
      });
  };

  const renderBinHistory = ({ item }: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#D9EDDF",
          height: screen.height * 0.1,
          width: screen.width * 0.8,
          justifyContent: "space-between",
          marginBottom: screen.height * 0.01,
          borderRadius: 20,
          padding: 10,
        }}
      >
        <Text>{item.actId}</Text>
        <Text>{item.userEmail}</Text>
        <Text>{item.dtmCreated}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[globalStyles.pageContainer, { alignItems: "center" }]}
    >
      <ImageBackground
        source={require("../../../assets/pageAsset/screen-bg.png")}
        style={globalStyles.imageBackground}
      />
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={globalStyles.title}>{route.params.binName}</Text>
        {binImage ? (
          <Image
            source={{ uri: binImage }}
            style={{ height: 300, width: 300 }}
          />
        ) : (
          <Text>No bin Image uploaded</Text>
        )}
        {/* REGISTERED BY */}
        <View style={{ width: "100%" }}>
          <Text style={globalStyles.title}>Registered By</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="person-circle-outline" style={{ fontSize: 24 }} />
            <Text style={{ fontSize: 18 }}>Anton Soerendro</Text>
          </View>
        </View>
        {/* DESCRIPTION */}
        <View style={{ width: "100%" }}>
          <Text style={globalStyles.title}>Description</Text>
          <Text style={{}}>{route.params.binNotes}</Text>
        </View>

        {/* ADDRESS */}
        <View style={{ width: "100%" }}>
          <Text style={globalStyles.title}>Address</Text>
          <Text style={{}}>{route.params.binAddress}</Text>
        </View>

        <Text style={[globalStyles.title, {}]}>Bin History</Text>
        <TouchableOpacity style={styles.throwButton} onPress={throwBin}>
          <Text>Throw Here</Text>
        </TouchableOpacity>
        <View>
          {/* {binHistory.length > 0 ? (
            <FlatList
              data={binHistory}
              renderItem={renderBinHistory}
              nestedScrollEnabled={true}
            ></FlatList>
          ) : (
            <Text>No History in this bin</Text>
          )} */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BinDetailsScreen;

const styles = StyleSheet.create({
  throwButton: {
    width: "50%",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: screen.height * 0.03,
  },
});
