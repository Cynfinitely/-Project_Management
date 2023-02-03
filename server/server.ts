const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const dbo = require("./db/conn.ts");

app.get("/", (req, res) => res.send("Hello world!"));

require("./routes/project.routes.ts")(app)
require("./routes/task.routes.ts")(app)
require("./routes/comment.routes.ts")(app)
require("./routes/user.routes.ts")(app)



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
