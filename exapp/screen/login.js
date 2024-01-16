import { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../context/AuthContext";
import { useMutation, gql } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { getValueFor, save } from "../helpers/secure";

const LOGIN_USER = gql`
  mutation Mutation($loginInput: LoginInput) {
    login(loginInput: $loginInput) {
      token
    }
  }
`;

export default function LoginScreen({ navigation }) {
  const auth = useContext(AuthContext);
  const [login, { loading, error, data }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      // console.log(data, "<----------------");
    },
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (data && !error) {
      // console.log("data dari use effect", data);
      save("token", data.login.token).then(() => {
        auth.setIsSignedIn(true);
      });
    }
  }, [data]);
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
        placeholder="Username"
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
      />
      <TextInput
        placeholder="Password"
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
      />
      <TouchableOpacity
        onPress={() => {
          // console.log("login",username,password);
          if (!loading) {
            login({
              variables: {
                loginInput: {
                  username,
                  password,
                },
              },
            });
          }
          // auth.setIsSignedIn(true);
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
        <Text style={{ color: "white", fontSize: 16 }}>Login</Text>
      </TouchableOpacity>
      <Text style={{ paddingTop: 15, fontWeight: "bold" }}>or</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
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
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}
