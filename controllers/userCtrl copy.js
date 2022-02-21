const Groups = require("../models/groupModel");

const groupCtrl = {
  searchGroup: async (req, res) => {
    try {
      const groups = await Groups.find({
        name: { $regex: req.query.name },
      })
        .limit(10)
        .select("name about avatar");

      res.json({ groups });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getGroup: async (req, res) => {
    try {
      const group = await Groups.findById(req.params.id)
        .select("-password")
        .populate("followers following", "-password");

      if (!group) {
        return res.status(400).json({ msg: "requested group does not exist." });
      }

      res.json({ group });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateGroup: async (req, res) => {
    try {
      const {
        avatar,
        name,
        members,
        status,
        about,
      } = req.body;
      if (!fullname) {
        return res.status(400).json({ msg: "Please add your full name." });
      }

      await Groups.findOneAndUpdate(
        { _id: req.group._id },
        { avatar, name, members, status, story, about }
      );

      res.json({ msg: "Group updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  join: async (req, res) => {
    try {
      const group = await Groups.find({
        _id: req.params.id,
        members: req.group._id,
      });
      if (group.length > 0)
        return res
          .status(500)
          .json({ msg: "You are already a member of this group." });



      const newGroup = await Groups.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            members: req.group._id
          },
        },
        { new: true }
      ).populate("followers following", "-password");

      await Groups.findOneAndUpdate(
        { _id: req.group._id },
        { $push: { members: req.params.id } },
        { new: true }
      );

      res.json({ newGroup });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  unfollow: async (req, res) => {
    try {
      

      const newGroup = await Groups.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: req.group._id }
        },
        { new: true }
      ).populate('followers following', '-password');

      await Groups.findOneAndUpdate(
        { _id: req.group._id },
        { $pull: { following: req.params.id } },
        { new: true }
      );

      res.json({ newGroup });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  suggestionsGroup: async (req, res) => {
    try {
      const newArr = [...req.group.following, req.group._id];

      const num = req.query.num || 10;
      const groups = await Groups.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        {
          $lookup: {
            from: "groups",
            localField: "followers",
            foreignField: "_id",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "groups",
            localField: "following",
            foreignField: "_id",
            as: "following",
          },
        },
      ]).project("-password");

      return res.json({
        groups,
        result: groups.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },



};

module.exports = groupCtrl;
