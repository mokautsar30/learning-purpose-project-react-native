import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Alert,
} from "react-native";

export default function PostDetailScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Post Detail Screen</Text>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title="Back"
        />
      </View>
    );
  }

    /**
   * in home page when click will render post by id
   * in post detail can like and comment
   * show comment and show like of post
   */