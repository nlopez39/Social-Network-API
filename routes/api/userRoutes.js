//import the express router
const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

//create get and post route for users
// /api/users
router.route("/").get(getUsers).post(createUser);

//create update, get one and delete  route for users
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
//TODO: POST WRKS WHEN ON THE SECOND CLICK
//POST to add a new friedn to a user's friend list  and DELETE
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
