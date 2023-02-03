const mongoose = require('mongoose')
const Db = process.env.ATLAS_URI;
const client = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = mongoose.connect(Db, client)
  .then(() => console.log("Successfully connected to mongoose"))
  .catch((err) => console.log(err))
module.exports = connection