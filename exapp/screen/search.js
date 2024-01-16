import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQuery, gql } from "@apollo/client";

const GET_USER_NAME = gql`
  query Query($username: String) {
    GetUserByName(username: $username) {
      _id
      name
      username
      email
      password
    }
  }
`;
const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { loading, error, data } = useQuery(GET_USER_NAME, {
    variables: { username: searchText },
  });

  const handleSearch = () => {
    if (data && data.GetUserByName) {
      setSearchResults(data.GetUserByName);
    } else {
      setSearchResults([]);
    }
    console.log("Search Results:", searchResults);
  };

  const renderSearchResult = ({ item }) => {
    console.log("Render Item:", item);

    return (
      <TouchableOpacity
        style={styles.searchResultContainer}
        onPress={() => {
          navigation.navigate("Profile", { userId: item._id });
        }}
      >
        <Text>{item.username}</Text>
      </TouchableOpacity>
    );
  };
  console.log(data);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for users"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item._id}
        renderItem={renderSearchResult}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchButton: {
    padding: 8,
    backgroundColor: "blue",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  searchResultContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});

export default SearchScreen;
