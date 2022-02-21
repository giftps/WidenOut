const Groups = require("../models/groupModel");

const groupCtrl = {

  allGroups: async (req, res) => {
    try {

      const groups = await Groups.find();

      if (!groups) {
        return res.status(400).json({ msg: "Not getting groups ??" });
        alert("query");
      }
      
      // const groups = ["ellen","Joan","sandy"];

      return res.json({
        groups,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },



};

module.exports = groupCtrl;
