const User = require("../models/user.model.ts");
const Project = require("../models/project.model.ts");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.signup = async function (req, res) {
  try {
    const user = await User.create(req.body);

    const payload = {
      userId: user._id
    }
    const secretKey = process.env.JWT_SECRET_KEY
    const token = jwt.sign(payload, secretKey)
    res.json({ userToken: token, fullname: user.fullname, email: user.email, id: user.id })

  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.login = async function (req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    const correctPassword = await bcrypt.compare(req.body.password, user.password)
    if (!correctPassword) {
      // test here
      return res.status(400);
    }

    const payload = {
      userId: user._id
    }

    const secretKey = process.env.JWT_SECRET_KEY
    const token = jwt.sign(payload, secretKey)

    res.json({ userToken: token, fullname: user.fullname, email: user.email, id: user.id })

  } catch (err) {
    res.status(400).json(" email dosn't exist ");
  }
};

module.exports.getAllUsers = async function (req, res) {
  const users = await User.find();
  res.json(users)
}


module.exports.findUserById = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(singleUser => res.json({ user: singleUser }))
    .catch(err => res.status(400).json(err))
}

module.exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(deletedUser => res.json({ user: deletedUser }))
    .catch(err => res.json({ message: "something went wrong", error: err }))
}

// module.exports.findAllTasksOfProject = (req, res) => {
//   Project.find({ users: req.params.id })
//       .then(Projects => res.json({ projects: Projects }))
//       .catch(err => res.status(400).json(err))
// }