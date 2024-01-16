const { ObjectId } = require("bson");
const { getDb } = require("../config/mongodb");
const redis = require("../config/redis");

class Post {
  static getCollection() {
    return getDb().collection("posts");
  }
  static async getAllPost() {
    // console.log(getDb());
    const postChace = await redis.get("posts");
    if (postChace) {
      // console.log("masuk");
      const posts = JSON.parse(postChace);
      return posts;
    } else {
      const agg = [
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            "author.password": 0,
          },
        },
      ];
      const posts = await this.getCollection().aggregate(agg).toArray();

      await redis.set("posts", JSON.stringify(posts));

      return posts;
    }
  }
  static async createAnPost(post) {
    const newPost = await this.getCollection().insertOne(post);
    await redis.del("posts");
    return newPost;
  }
  static async findPostById(id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "author.password": 0,
        },
      },
    ];

    const post = await this.getCollection().aggregate(agg).toArray();
    console.log(post[0]);
    return post[0];
  }
  static async deletePostById(id) {
    const deleteposting = await this.getCollection().deleteMany({
      _id: new ObjectId(id),
    });
    return deleteposting;
  }
  static async updatePost(post) {
    const result = await this.getCollection().updateOne(
      { _id: new ObjectId(post._id) },
      { $set: post }
    );
    return result;
  }
}

module.exports = Post;
