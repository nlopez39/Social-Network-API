//import Thought model
const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get a single thought by its Id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message: "Thought created, but found no user with that ID",
        });
      }
      res.json("Created the Thought!!");
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  //update a thought by its id
  async updateThought(req, res) {
    try {
      const updatethought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId }, //find
        { $set: req.body }, //update
        { new: true } //set as new
      );
      res.json(updatethought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //delete thought by its id
  async deleteThought(req, res) {
    try {
      const deletethought = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId } //find
      );
      res.json(deletethought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //add a reaction
  async addReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!reaction) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //remove reaction
  async removeReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!reaction) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
