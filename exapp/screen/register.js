import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useMutation, gql } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { getValueFor, save } from "../helpers/secure";

const REGISTER_USER = gql`
  mutation Mutation($newUser: NewUser) {
    register(newUser: $newUser) {
      _id
      email
      username
    }
  }
`;

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser] = useMutation(REGISTER_USER);

  const handleRegistration = async () => {
    try {
      const newUser = { name, username, email, password };
      const { data } = await registerUser({ variables: { newUser } });

      await save("userId", data.register._id);
      await save("userEmail", data.register.email);
      await save("username", data.register.username);

      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 25,
          marginBottom: 10,
          color: "blue",
        }}
      >
        HackBook
      </Text>
      <TextInput
        placeholder="Input Your name"
        autoFocus
        value={name}
        onChangeText={setName}
        style={{
          height: 40,
          width: "80%",
          borderColor: "gray",
          borderWidth: 1,
          paddingLeft: 10,
          marginBottom: 10,
          borderRadius: 10,
        }}
      ></TextInput>
      <TextInput
        placeholder="Input Your username"
        autoFocus
        value={username}
        onChangeText={setUsername}
        style={{
          height: 40,
          width: "80%",
          borderColor: "gray",
          borderWidth: 1,
          paddingLeft: 10,
          marginBottom: 10,
          borderRadius: 10,
        }}
      ></TextInput>
      <TextInput
        placeholder="Input Your email"
        autoFocus
        value={email}
        onChangeText={setEmail}
        style={{
          height: 40,
          width: "80%",
          borderColor: "gray",
          borderWidth: 1,
          paddingLeft: 10,
          marginBottom: 10,
          borderRadius: 10,
        }}
      ></TextInput>
      <TextInput
        placeholder="Input Your password"
        autoFocus
        value={password}
        onChangeText={setPassword}
        style={{
          height: 40,
          width: "80%",
          borderColor: "gray",
          borderWidth: 1,
          paddingLeft: 10,
          marginBottom: 10,
          borderRadius: 10,
        }}
      ></TextInput>
      <TouchableOpacity
        onPress={handleRegistration}
        style={{
          marginTop: 20,
          paddingVertical: 12,
          backgroundColor: "blue",
          borderRadius: 15,
          width: "50%",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Register
        </Text>
      </TouchableOpacity>

      <Text style={{ paddingTop: 15, fontWeight: "bold" }}>or</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
        style={{
          marginTop: 20,
          paddingVertical: 12,
          backgroundColor: "blue",
          borderRadius: 15,
          width: "50%",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Already have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
}
