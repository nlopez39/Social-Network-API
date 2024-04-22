//here we will write the HTTP requests to the server?
const User = require("../models/User");
const { ObjectId } = require("mongodb");
//export all the http requests as modules
//getUsers listens for browser input?
//is the user doing a get and then we return somehting to the browser?
module.exports = {
  //get all users and outut results to the browser
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get a single user by its id
  async getSingleUser(req, res) {
    try {
      const objId = new ObjectId(req.params.userId);
      const singleUser = await User.findOne({ _id: objId });
      res.json(singleUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update a user ---- 4/21 NOT WORKING
  async updateUser(req, res) {
    try {
      // const objId = new ObjectId(req.params.userId);
      const updateuser = await User.findOneAndUpdate({
        _id: req.params.userId,
      });
      console.log("id" + req.params.userId);
      res.json(updateuser);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  //create a new user, create user document?
  //is this creating a new user into mongoDB and result is being sent to the browser ?
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      //result is being sent to the browser?
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const objId = new ObjectId(req.params.userId);
      const deleteuser = await User.findOneAndDelete({ _id: objId });
      res.json(deleteuser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //add a friend to the user account
  async addFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;
      const addfriend = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friendId } }
      );
      res.json(addfriend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //remove a friend from the friend list
  //DELETE NOT WORKING
  async removeFriend(req, res) {
    try {
      // const userId = req.params.userId;
      const friendId = req.params.friendId;
      const removefriend = await User.findOneAndDelete(
        { friends: friendId },
        { $pull: { friends: friendId } }
      );
      res.json(removefriend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
