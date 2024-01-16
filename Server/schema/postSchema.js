
const posts = [
    {
      id: 1,
      content: "test content",
      tags: ["ini", "tags", "testing"],
      imgUrl: "test image",
      authorId: 1,
      comments: ["test", "comments"],
      likes: ["test", "likes"],
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ];

//schema
const typeDefs = `#graphql
    type Post {
        _id: ID
        content: String!
        tags:[String]
        imgUrl: String
        authorId: ID!
        comments:[Comment]
        likes: [Like]
        createdAt: String
        updatedAt: String
        author: Author
    }

    type Author {
      _id: ID
      name: String
      username: String
      email: String
      password: String
    }

    type Comment {
      _id: ID
      comments: String
      username: String
      createdAt: String
      updatedAt:String
    }

    type Like {
      username: String
      createdAt: String
      updatedAt: String
    }

    input NewPost {
      content: String!
      tags:[String]
      imgUrl: String
      authorId: ID!
      comments:[NewCommentInput]
      likes: [NewLike]
      createdAt: String
      updatedAt: String
    }

    input NewCommentInput {
      _id: ID
      comments: String!
      username: String!
    }

    input NewLike {
      username: String
    }

    type Query {
        GetPosts: [Post]
        GetPostById(id:ID): Post
    }


    type Mutation {
      createPost(newPost: NewPost): Post
      deletePost(id: ID): Post
      addComment(postId: ID!, newComment: NewCommentInput): Comment
      addLike(postId: ID!, newLike: NewLike): Like
    }
`;

module.exports = typeDefs