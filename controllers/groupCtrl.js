const Users = require("../models/userModel");

const groupCtrl = {

  allGroups: async (req, res) => {
    try {

      const groups = await Users.find({role: "group"});

      if (!groups) {
        return res.status(400).json({ msg: "Not getting groups ??" });
      }
      
      // const groups = ["ellen","Joan","sandy"];

      return res.json({
        groups,
      });
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
      return res.status(500).json({ msg: "err.message" });
    }
  },



};

module.exports = groupCtrl;
