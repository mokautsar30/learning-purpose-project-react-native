import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

const ADD_POST = gql`
  mutation Mutation($newPost: NewPost) {
    createPost(newPost: $newPost) {
      _id
      imgUrl
      authorId
      author {
        _id
        email
        name
        password
        username
      }
      content
      tags
    }
  }
`;

export default function CreatePostScreen() {
  const navigation = useNavigation();
  const [content, setContent] = useState("");
  // const [imgUrl, setImgUrl] = useState("");
  const [addPost, { loading, error, data }] = useMutation(ADD_POST);

  console.log(loading, error, data);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="What's on your mind?"
          value={content}
          onChangeText={(text) => setContent(text)}
          style={styles.input}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          addPost({
            variables: {
              newPost: {
                authorId: "6597f8983bb3fda96b2e01f4",
                content,
                // imgUrl
              },
            },
          });
          // console.log(result);
          navigation.goBack();
        }}
      >
        <Text>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
    marginTop: 40,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 5,
  },
  buttonContainer: {
    position: "absolute",
    top: 10,
    right: 16,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 100,
    position: "absolute",
    top: 10,
    left: 16,
  },
});

/**
 * create new post and back to homescreen/homepage
 * new post render to homepage
 *
 */
