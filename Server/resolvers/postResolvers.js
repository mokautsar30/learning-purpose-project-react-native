const { ObjectId } = require("mongodb");
const Post = require("../models/post");

const resolvers = {
  Query: {
    GetPosts: async (_, __, contextValue) => {
      const user = contextValue.auth();
      if (!user) {
        throw new Error("Authentication failed");
      }
      // console.log(user);
      const posts = await Post.getAllPost();
      // console.log(posts);
      return posts;
    },
    GetPostById: async (_, args, contextValue) => {
      const user = contextValue.auth();
      console.log(user);
      if (!user) {
        throw new Error("Authentication failed");
      }
      // console.log(args);
      const findPost = await Post.findPostById(args.id);
      return findPost;
    },
  },
  Mutation: {
    createPost: async (_, args, contextValue) => {
      // console.log(args);
      const user = contextValue.auth();
      console.log(user);
      if (!user) {
        throw new Error("Authentication failed");
      }
      const newPost = {
        content: args.newPost.content,
        tags: args.newPost.tags,
        imgUrl: args.newPost.imgUrl,
        authorId: new ObjectId(user.userId),
        comments: (args.newPost.comments || []).map((comment) => ({
          _id: new ObjectId(),
          comments: comment.comments,
          username: comment.username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })),
        likes: (args.newPost.likes || []).map((like) => ({
          username: like.username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const result = await Post.createAnPost(newPost);
      console.log(result);
      return newPost;
    },
    deletePost: async (_, args, contextValue) => {
      const user = contextValue.auth();
      console.log(args);
      const postToDelete = await Post.findPostById(args.id);
      const deleteResult = await Post.deletePostById(args.id);
      if (deleteResult.deletedCount === 1) {
        return postToDelete;
      } else {
        return null;
      }
    },
    addComment: async (_, { postId, newComment }) => {
      const post = await Post.findPostById(postId);

      const comment = {
        _id: new ObjectId(),
        comments: newComment.comments,
        username: newComment.username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      post.comments.push(comment);

      await Post.updatePost(post);
      return comment;
    },
    addLike: async (_, { postId, newLike }) => {
      const post = await Post.findPostById(postId);

      const like = {
        _id: new ObjectId(),
        username: newLike.username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      post.likes.push(like);

      await Post.updatePost(post);
      return like;
    },
  },
};

module.exports = resolvers;
