const { ObjectId } = require("bson");
const { getDb } = require("../config/mongodb");

class Follow {
  static getCollection() {
    return getDb().collection("follows");
  }
  static async followUser(input) {
    const newFollow = {
      _id: new ObjectId(),
      followingId: input.followingId,
      followerId: input.followerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const result = await this.getCollection().insertOne(newFollow);
    return newFollow;
  }
  static async getAllFollows() {
    const follows = await this.getCollection().find().toArray();
    return follows;
  }
}

module.exports = Follow;
