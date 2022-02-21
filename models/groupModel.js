const mongoose = require("mongoose");
const { Schema } = mongoose;


const groupSchema = new Schema(
  {
    content: String,
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      default: "pending",
    },
    about: {
      type: String,
      default: "",
      maxlength: 200,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('group', groupSchema);