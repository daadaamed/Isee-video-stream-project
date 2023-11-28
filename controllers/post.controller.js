/** @format */

const postModel = require('../models/post.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const { uploadErrors } = require('../utils/errors.utils');
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require('fs');
const { promisify } = require('util');

module.exports.readPost = async (req, res) => {
  const posts = await PostModel.find().sort({ createdAt: -1 });
  res.status(200).json(posts);
};

module.exports.readOnePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

  PostModel.findOneAndUpdate(
    { _id: req.params.id },
    // { $inc: { view: 1 } },
    { new: true }
  )
    .then((post) => {
      res.status(200).send(post); // Afficher la vidéo trouvé
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

module.exports.createPost = async (req, res) => {
  let fileName;
  if (req.files) {
    try {
      if (
        req.files['picture'][0].mimetype != 'image/png' &&
        req.files['picture'][0].mimetype != 'image/jpg' &&
        req.files['picture'][0].mimetype != 'image/jpeg'
      ) {
        throw Error('Invalid File');
      }
      if (req.files['picture'][0].size > 500000) throw Error('max Size');
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
  }

  const newPost = new postModel({
    posterId: req.body.posterId,
    title: req.body.title,
    link: req.files['link'][0]
      ? './uploads/posts/' + req.files['link'][0].filename
      : '',
    picture: req.files['picture'][0]
      ? './uploads/posts/' + req.files['picture'][0].filename
      : '',
    category: req.body.category,
    comments: [],
  });

  try {
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

  PostModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((post) => {
      res.status(200).send(post); // Afficher la vidéo trouvé
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

module.exports.incrementPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

  PostModel.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { view: 1 } },
    { new: true }
  )
    .then((post) => {
      res.status(200).send(post); // Afficher la vidéo trouvé
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

module.exports.hidePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

  PostModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: 'Hide' },
    { new: true }
  )
    .then((post) => {
      res.status(200).send(post); // Afficher la vidéo trouvé
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

module.exports.activePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

  PostModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: 'Active' },
    { new: true }
  )
    .then((post) => {
      res.status(200).send(post); // Afficher la vidéo trouvé
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

module.exports.blockPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

  PostModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: 'Block' },
    { new: true }
  )
    .then((post) => {
      res.status(200).send(post); // Afficher la vidéo trouvé
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

  PostModel.findOneAndDelete({ _id: req.params.id })
    .then((deletedPost) => {
      res
        .status(200)
        .send('La vidéo ' + deletedPost._id + ' a été correctement delete'); // Afficher l'utilisateur supprimé
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

  try {
    return PostModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    )
      .then((post) => {
        res.status(200).send(post); // Afficher la vidéo trouvé
      })
      .catch((err) => {
        res.status(200).send(err);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

  //     try {
  //         return PostModel.findById(
  //             req.params.id,
  //             (err,docs) => {
  //                 const theComment = docs.comments.find((comment) =>
  //                     comment._id.equals(req.body.commentId)
  //                 )

  //                 if (!theComment) return res.status(404).send("Comment not found");
  //                 theComment.text = req.body.text;

  //                 return docs.save((err) => {
  //                     if (!err) res.status(200).send(docs);
  //                     return res.status(500).send(err)
  //                 })
  //             }
  //         )
  //    } catch (err) {
  //         return res.status(400).send(err)
  //    }

  //    PostModel.findById(req.params.id)
  //         .then(docs => {
  //             const theComment = docs.comments.find((comment) =>
  //                 comment._id.equals(req.body.commentId)
  //             )

  //             if (!theComment) res.status(404).send("Comment not found");
  //             theComment.text = req.body.text;

  //             docs.save((err) => {
  //                 if (!err) res.status(200).send(docs);
  //                 return res.status(500).send(err)
  //             })
  //         })
  //         .catch(err => {
  //             return res.status(400).send(err)
  //         });
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

  try {
    return PostModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    )
      .then((post) => {
        res.status(200).send(post); // Afficher la vidéo trouvé
      })
      .catch((err) => {
        res.status(200).send(err);
      });
  } catch (err) {
    return res.status(400).send(err);
  }
};
