const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

module.exports = {
  create,
  login,
  // checkToken
};

// function checkToken(req, res) {
//   // req.user will always be there for you when a token is sent
//   console.log('req.user', req.user);
//   res.json(req.exp);
// }

async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can use res.json to send back just a string
    // The client code needs to take this into consideration
    res.json(token);
  } catch (err) {
    // Client will check for non-2xx status code
    // 400 = Bad request
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error('User not found');
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error('Invalid password');
    res.json(createJWT(user));
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

/* Helper Functions */
// use both when a user signs up and when they log in
function createJWT(user) {
  return jwt.sign(
    // token's payload has a user property that contains the data from the user's MongoDB document
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}