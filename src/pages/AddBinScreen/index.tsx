import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../../style/styleGlobal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const screen = Dimensions.get("screen");

const AddBinScreen = ({ navigation }) => {
  const [toBeAddedBinName, setToBeAddedBinName] = useState(null);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [toBeUploadedImageURL, setToBeUploadedImageURL] = useState(null);
  const [toBeAddedBinAddress, setToBeAddedBinAddress] = useState(null);
  const [toBeAddedBinNotes, setToBeAddedBinNotes] = useState(null);

  const pickImage = async () => {
    //No permission request to open Image Picker
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const uploadImage = async () => {
    setIsUploading(true);

    const response = await fetch(image.uri);
    const blob = await response.blob();
    const fileName = image.uri.substring(image.uri.lastIndexOf("/") + 1);

    try {
      const storageRef = ref(storage, fileName);

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, blob).then((snapshot: any) => {
        Alert.alert("Uploaded a blob or file!");
        // console.log("Bucket: " + JSON.stringify(snapshot.metadata.bucket));
        // console.log("FullPath: " + JSON.stringify(snapshot.metadata.fullPath));
        setToBeUploadedImageURL(
          "gs://".concat(
            snapshot.metadata.bucket,
            "/",
            snapshot.metadata.fullPath
          )
        );
        console.log(toBeUploadedImageURL);
        setIsUploading(false);
      });
    } catch (e) {
      Alert.alert("Error", "error + " + e + " has occured");
      setIsUploading(false);
    }
  };

  const addBin = async (toBeAddedBinName: string) => {
    // try {
    //   uploadImage().then(async () => {
    //     const docRef = await addDoc(collection(db, "bins"), {
    //       binName: toBeAddedBinName,
    //       imageLocationURL: toBeUploadedImageURL,
    //     });
    //     console.log("Document written with ID: ", docRef.id);
    //     if (docRef) {
    //       Alert.alert("Succedd!");
    //     }
    //   });
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
    try {
      const docRef = await addDoc(collection(db, "bins"), {
        binName: toBeAddedBinName,
        imageLocationURL: toBeUploadedImageURL,
        binAddress: toBeAddedBinAddress,
        binNotes: toBeAddedBinNotes,
      });
      console.log("Document written with ID: ", docRef.id);
      if (docRef) {
        Alert.alert("Succedd!");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.pageContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require("../../../assets/pageAsset/screen-bg.png")}
          style={globalStyles.imageBackground}
        />
        <ActivityIndicator animating={isUploading} size={"large"} />
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Bin Picture</Text>
        {image ? (
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: image.uri }}
              style={{ height: 300, width: 300 }}
            />
          </View>
        ) : (
          <Text>No Image Selected</Text>
        )}
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          Take Bin Picture
        </Text>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text>Open Camera</Text>
        </TouchableOpacity>
        {/* BIN NAME */}
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Nama Bin</Text>
        <TextInput
          style={[globalStyles.textInput, { marginTop: screen.height * 0.01 }]}
          placeholder="Masukan nama bin"
          onChangeText={(val: string) => setToBeAddedBinName(val)}
        />
        {/* BIN ADDRESS */}
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Alamat Bin</Text>
        <TextInput
          style={[globalStyles.textInput, { marginTop: screen.height * 0.01 }]}
          placeholder="Masukan alamat bin"
          onChangeText={(val: string) => setToBeAddedBinAddress(val)}
        />
        {/* BIN NOTES */}
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Notes Bin</Text>
        <TextInput
          style={[globalStyles.textInput, { marginTop: screen.height * 0.01 }]}
          placeholder="Masukan notes bin"
          onChangeText={(val: string) => setToBeAddedBinNotes(val)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(toBeAddedBinName);
            // addBin(toBeAddedBinName);
            if (uploadImage()) addBin(toBeAddedBinName);
            else {
              Alert.alert("GAGAL");
            }
          }}
        >
          <Text>Add Bin</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddBinScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    elevation: 1,
    height: screen.height * 0.05,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
