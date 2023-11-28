/** @format */

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      trim: true,
      required: true,
    },
    picture: {
      type: String,
    },
    view: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'Active',
    },
    category: {
      type: String,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true, // Tableau crée de base
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('post', PostSchema);
