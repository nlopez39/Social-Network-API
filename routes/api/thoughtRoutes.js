//can we please go over this template and why we write code like this
//and maybe simplify the explanation to me

const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  createThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions to create a reaction
router.route("/:thoughtId/reactions").post(addReaction);
///api/thoughts/:thoughtId/reactions/:reactionId to delete reaction
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
