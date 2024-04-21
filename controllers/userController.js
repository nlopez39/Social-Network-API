//here we will write the HTTP requests to the server?
const User = require("../models/User");
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
};
