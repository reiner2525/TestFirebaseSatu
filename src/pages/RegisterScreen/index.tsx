import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../../style/styleGlobal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../App";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { LoadingIndicator } from "../../components";
import { db } from "../../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const screen = Dimensions.get("screen");

const RegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);

  const registerUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        // console.log(user.);
        Alert.alert(
          "User Registered!",
          "Email: " +
            JSON.stringify(user.user.email) +
            "\nUID: " +
            JSON.stringify(user.user.uid)
        );
        try {
          const docRef = await addDoc(collection(db, "users"), {
            email: email,
            name: username,
            password: password,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        Alert.alert(error + " has occured while registering user");
      });
  };
  return (
    <View style={[globalStyles.pageContainer, { justifyContent: "center" }]}>
      <View style={{ alignItems: "center" }}>
        <Text style={globalStyles.title}>Create profile</Text>
      </View>
      <Text>Email</Text>
      <TextInput
        style={globalStyles.textInput}
        placeholder="Enter your email"
        value={email}
        onChangeText={(val) => {
          setEmail(val);
        }}
      />
      <Text>Password</Text>
      <TextInput
        style={globalStyles.textInput}
        placeholder="Enter your password"
        value={password}
        onChangeText={(val) => {
          setPassword(val);
        }}
      />

      <Text>Username</Text>
      <TextInput
        style={globalStyles.textInput}
        placeholder="Enter your username"
        value={username}
        onChangeText={(val) => {
          setUsername(val);
        }}
      />
      <View style={{ alignItems: "center", marginTop: screen.height * 0.1 }}>
        <TouchableOpacity style={styles.loginButton} onPress={registerUser}>
          <Text style={{ color: "#FFFFFF" }}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "#4fe377",
    height: screen.height * 0.05,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "50%",
  },
});
