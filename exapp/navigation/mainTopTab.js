import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screen/home";
import SearchScreen from "../screen/search";
import ProfileScreen from "../screen/profile";
import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

export default function MainTopTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              name="home"
              size={20}
              color={focused ? "blue" : "#272727"}
            />
          ),
        }}
        component={HomeScreen}
        name="Dashboard"
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              name="search"
              size={20}
              color={focused ? "blue" : "#272727"}
            />
          ),
        }}
        component={SearchScreen}
        name="Search"
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              name="person"
              size={20}
              color={focused ? "blue" : "#272727"}
            />
          ),
        }}
        component={ProfileScreen}
        name="Profile"
      />
    </Tab.Navigator>
  );
}
