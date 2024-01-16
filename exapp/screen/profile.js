import React, { useContext } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AuthContext } from "../context/AuthContext";

// Sub-screens for tabs component
const MainProfileScreen = () => (
  <View style={styles.tabContainer}>
    <Text>Main Profile Screen</Text>
  </View>
);

const FollowersScreen = () => (
  <View style={styles.tabContainer}>
    <Text>Followers Screen</Text>
  </View>
);

const FollowingScreen = () => (
  <View style={styles.tabContainer}>
    <Text>Following Screen</Text>
  </View>
);

//end

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>User's Name</Text>
        <TouchableOpacity
          onPress={() => {
            auth.setIsSignedIn(false);
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Tab.Navigator>
        <Tab.Screen name="Profiles" component={MainProfileScreen} />
        <Tab.Screen name="Followers" component={FollowersScreen} />
        <Tab.Screen name="Following" component={FollowingScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutText: {
    color: "red",
    fontSize: 16,
  },
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
