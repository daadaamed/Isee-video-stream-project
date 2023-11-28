/** @format */

const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      unique: true,
      trim: true,
    },
    // nom: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    // prenom: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      default: 'Utilisateur',
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    picture: {
      type: String,
      default: './uploads/profil/random-user.png',
    },
    bio: {
      type: String,
      maxLength: 1024,
      default: 'default_Bio',
    },
    // followers: {
    //   type: [String],
    // },
    // following: {
    //   type: [String],
    // },
    statut: {
      type: String,
      default: 'Activate',
    },
  },
  {
    timestamps: true,
  }
);

// play function before save into db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// play function before update password into db
userSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.password) {
    const salt = await bcrypt.genSalt();
    this._update.password = await bcrypt.hash(this._update.password, salt);
  }
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
