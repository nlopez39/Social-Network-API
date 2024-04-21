//can we please go over this template and why we write code like this
//and maybe simplify the explanation to me

const router = require("express").Router();
const {
  getThoughts,
  createThought,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
// router
// .route("./:thoughtId")
// .get(getSingleThought)
// .put(updateThought)
// .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions

// /api/thoughts/:thoughtId/reactions/:reactionId

module.exports = router;
