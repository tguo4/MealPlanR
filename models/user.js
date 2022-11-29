const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// used to hash password
const bcrypt = require('bcrypt');
// SALT_ROUNDS variable determines how much processing time it will take to perform the hash;
const SALT_ROUNDS = 6; // 6 is a reasonable value for most apps

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  }
}, {
  timestamps: true,
  // toJSON option is used to transform the document when it's serialized to JSON (converted to a string)
  // Even though it's hashed - don't serialize the password
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', async function(next) {
  // 'this' is the user doc (can't use arrow function)
  if (!this.isModified('password')) return next();
  // update the password with the computed hashed
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model('User', userSchema);