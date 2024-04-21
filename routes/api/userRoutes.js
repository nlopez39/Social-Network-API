//import the express router
const router = require("express").Router();
const { getUsers, createUser } = require("../../controllers/userController");

//create get and post route for users
// /api/users
router.route("/").get(getUsers).post(createUser);

//create update, get one and delete  route for users

module.exports = router;
