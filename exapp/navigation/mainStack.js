import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/home";
import SearchScreen from "../screen/search";
import ProfileScreen from "../screen/profile";
import PostDetailScreen from "../screen/detailPost";
import CreatePostScreen from "../screen/createPost";
import LoginScreen from "../screen/login";
import RegisterScreen from "../screen/register";
import MainTopTab from "./mainTopTab";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getValueFor } from "../helpers/secure";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const auth = useContext(AuthContext);

  useEffect(() => {
    getValueFor("token").then((result) => {
      if (result) {
        auth.setIsSignedIn(true);
      }
    });
  }, []);

  return (
    <Stack.Navigator>
      {auth.isSignedIn ? (
        <>
          <Stack.Screen
            name="Home"
            component={MainTopTab}
            options={{
              title: "HackBook",
              headerBackVisible: false,
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 24,
                color: "#0400ff",
              },
              headerRight: () => (
                <View style={{ flexDirection: "row", marginRight: 10 }}>
                  <Ionicons
                    name="add-circle-sharp"
                    size={20}
                    color={"#272727"}
                    style={{ marginRight: 10 }}
                  />
                  <Ionicons
                    name="search"
                    size={20}
                    color={"#272727"}
                    style={{ marginRight: 10 }}
                  />
                  <Ionicons name="chatbubble" size={20} color={"#272727"} />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ title: "Search User" }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "User Profile" }}
          />
          <Stack.Screen
            name="Create"
            component={CreatePostScreen}
            options={{ title: "Create Post" }}
          />
          <Stack.Screen
            name="Post"
            component={PostDetailScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
