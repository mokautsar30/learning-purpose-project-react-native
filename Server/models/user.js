const { ObjectId } = require("bson");
const { getDb } = require("../config/mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// console.log(secret, process.env.JWT_SECRET);

class User {
  static getCollection() {
    return getDb().collection("users");
  }
  static async getAll() {
    // console.log(getDb());
    const users = await this.getCollection().find().toArray();
    return users;
  }
  static async register(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    const newUser = await this.getCollection().insertOne(user);
    return {
      ...user,
      _id: newUser.insertedId,
    };
  }

  static async login(loginInput) {
    const { username, password } = loginInput;
    const user = await this.getCollection().findOne({
      username,
    });
    if (!user) {
      throw new Error("invalid email/password");
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Authentication failed!");
    }
    console.log(secret);
    const token = jwt.sign({ username, userId: user._id }, secret);
    console.log(token);
    return {
      token,
    };
  }
  // static async createUser(user) {
  //     const newUser = await this.getCollection().insertOne(user)
  //     return newUser
  // }
  static async findUserById(id) {
    const user = await this.getCollection().findOne({ _id: new ObjectId(id) });
    return user;
  }
  static async findUserByName(username) {
    const user = await this.getCollection().findOne({ username });
    return user;
  }
}

module.exports = User;
