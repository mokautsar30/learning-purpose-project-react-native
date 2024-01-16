import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "../style";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        height: 58,
        padding: 0,
        paddingHorizontal: 5,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Create");
        }}
      >
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="What's on your mind?"
        autoFocus
        style={{
          height: 40,
          width: "70%",
          borderColor: "gray",
          borderWidth: 1,
          paddingLeft: 10,
          margin: 10,
          borderRadius: 10,
          backgroundColor: "white",
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Create");
        }}
      >
        <Ionicons
          name="images-outline"
          size={25}
          color={"#5bd130"}
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
}
