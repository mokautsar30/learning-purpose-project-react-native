import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "../component/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, gql } from "@apollo/client";
import PostCard from "../component/PostCard";

const GET_POSTS = gql`
  query Query {
    GetPosts {
      _id
      content
      imgUrl
      authorId
      createdAt
      updatedAt
    }
  }
`;

// const posts = [{name: "moka"}, {name: "mokautsar"}]

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_POSTS, {
    context: {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1va2F1dHNhciIsInVzZXJJZCI6IjY1OWE0Mjc3MTRmMmE5Y2Y0NzRmZGFhNyIsImlhdCI6MTcwNDYwODQxMH0.lDpkNXHo9-EbDwELhBfWZJxYv54PiHoc0BYbYHG-xo0",
      },
    },
  });
  // console.log(loading, error, data);

  if (error) {
    return <Text>Error has occured</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1 }}>
        {!loading && (
          <FlatList
            data={data.GetPosts}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Post", {
                    id: item.id,
                  });
                }}
              >
                <PostCard post={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

/**
 * logo
 * top tabbar
 * post
 * create new post (navigate to create post screen)
 * can click post to post detail
 */
