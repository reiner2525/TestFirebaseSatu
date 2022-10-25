import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  HomeScreen,
  ExploreScreen,
  BinDetailsScreen,
  LoginScreen,
  RegisterScreen,
  AddBinScreen,
  VouchersScreen,
  MyVouchersScreen,
  ProfileScreen,
} from "./src/pages";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParams = {
  Login: any;
  Register: any;
  Explore: any;
  Home: any;
  BinDetails: {
    binName: string;
    binUniqueCode: string;
    binImageUrl: string;
    binAddress: string;
    binNotes: string;
  };
  AddBin: any;
  Vouchers: any;
  MyVouchers: any;
  Profile: any;
};
const RootStack = createNativeStackNavigator<RootStackParams>();
const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Register" component={RegisterScreen} />
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            headerTitle: "Bin Map",
          }}
        />
        <RootStack.Screen name="BinDetails" component={BinDetailsScreen} />
        <RootStack.Screen name="AddBin" component={AddBinScreen} />
        <RootStack.Screen name="Vouchers" component={VouchersScreen} />
        <RootStack.Screen name="MyVouchers" component={MyVouchersScreen} />
        <RootStack.Screen name="Profile" component={ProfileScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
