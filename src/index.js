const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const { config } = require('dotenv');

config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
