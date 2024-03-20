import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import InputText from "../components/Inputs/InputText";
import { RootScreenRoutesT } from "../types/routesT";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import Colors from "../constants/Colors";

type Props = NativeStackScreenProps<RootScreenRoutesT, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <ScrollView
      style={{
        paddingHorizontal: Spacing * 2,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: FontSize.xLarge,
            color: Colors.primary,
            fontFamily: Font["poppins-bold"],
            marginVertical: Spacing * 5,
          }}
        >
          Register here
        </Text>
        <Text
          style={{
            fontFamily: Font["poppins-semiBold"],
            fontSize: FontSize.large,
            maxWidth: "60%",
            textAlign: "center",
          }}
        >
          Welcome
        </Text>
      </View>
      <View
        style={{
          marginVertical: Spacing * 3,
        }}
      >
        <InputText placeholder="Full Name" />
        <InputText placeholder="Email" />
        <InputText placeholder="Password" />
      </View>

      <View>
        <Text
          style={{
            fontFamily: Font["poppins-semiBold"],
            fontSize: FontSize.small,
            color: Colors.primary,
            alignSelf: "flex-end",
          }}
        >
          Forgot your password ?
        </Text>
      </View>

      <TouchableOpacity
        style={{
          padding: Spacing * 2,
          backgroundColor: Colors.primary,
          marginVertical: Spacing * 3,
          borderRadius: Spacing,
          shadowColor: Colors.primary,
          shadowOffset: {
            width: 0,
            height: Spacing,
          },
          shadowOpacity: 0.3,
          shadowRadius: Spacing,
        }}
      >
        <Text
          style={{
            fontFamily: Font["poppins-bold"],
            color: Colors.onPrimary,
            textAlign: "center",
            fontSize: FontSize.large,
          }}
        >
          Sign in
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate("Login")}
        style={{
          padding: Spacing,
        }}
      >
        <Text
          style={{
            fontFamily: Font["poppins-semiBold"],
            color: Colors.text,
            textAlign: "center",
            fontSize: FontSize.small,
          }}
        >
          already have an account? Login
        </Text>
      </TouchableOpacity>

      <View
        style={{
          marginVertical: Spacing * 3,
        }}
      ></View>
    </ScrollView>
  );
};

export default RegisterScreen;
