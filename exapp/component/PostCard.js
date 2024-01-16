import React, { PureComponent, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

class PostCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      comments: 0,
      isLiked: false,
    };
  }

  handleLike = () => {
    this.setState((prevState) => ({
      likes: prevState.isLiked ? prevState.likes - 1 : prevState.likes + 1,
      isLiked: !prevState.isLiked,
    }));
  };

  // handleComment = () => {

  //   console.log('Comment button pressed');
  // };

  render() {
    const { post } = this.props;
    const { likes, comments, isLiked } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.contentText}>{post.content}</Text>
        {post.imgUrl && (
          <Image
            source={{
              uri: post.imgUrl,
            }}
            style={styles.image}
            onError={(error) => console.error("Error loading image:")}
          />
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.handleLike}>
            <Text>{isLiked ? "Unlike" : "Like"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Comment</Text>
          </TouchableOpacity>
        </View>
        <Text>Likes: {likes}</Text>
        <Text>Comments: {comments}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    margin: 10,
    padding: 10,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
});

export default PostCard;
