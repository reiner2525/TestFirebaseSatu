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
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { colorGlobal } from "../../../style/colorGlobal";

const screen = Dimensions.get("screen");
const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signInUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        Alert.alert("LOGGED IN!!!" + JSON.stringify(user.user));
        setIsSignedIn(true);
        navigation.navigate("Home", {});
      })
      .catch((error) => {
        Alert.alert("Error!" + error);
        console.log(error);
        setIsSignedIn(false);
      });
  };

  const signOutUser = () => {
    signOut(auth)
      .then((user) => {
        Alert.alert("LOGGED OUT!!!");
        setIsSignedIn(false);
        setEmail(null);
        setPassword(null);
      })
      .catch((error) => {
        Alert.alert("ERROR!!!", error + " has occured");
      });
  };

  return (
    <View style={[globalStyles.pageContainer, { justifyContent: "center" }]}>
      <View style={{ alignItems: "center" }}>
        <Text style={globalStyles.title}>Mr. Bin Apps</Text>
        <Text style={globalStyles.title}>Enter your credentials</Text>
      </View>
      <Text>Username</Text>
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
      <View style={{ alignItems: "center", marginTop: screen.height * 0.1 }}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={isSignedIn ? signOutUser : signInUser}
        >
          <Text>{isSignedIn ? "Sign Out" : "Sign In"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ marginTop: screen.height * 0.02, fontWeight: "bold" }}>
            Don't have any account? Click Here to register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: colorGlobal.PRIMARY_GREEN,
    height: screen.height * 0.05,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "50%",
  },
});
