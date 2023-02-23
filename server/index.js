const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const hostname = "127.0.0.1";

const db = require("monk")(`mongodb://${hostname}/twitterdb`);
const twitterposts = db.get("twitterposts");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.get("/tweets", (req, res) => {
  twitterposts.find().then((tweets) => {
    res.json(tweets);
  });
});

app.post("/tweets", (req, res) => {
  const tweet = {
    name: req.body.name.toString(),
    content: req.body.content.toString(),
    created: new Date(),
  };

  twitterposts.insert(tweet).then((createdTweet) => {
    res.json(createdTweet);
  });
  (err) => {
    console.error(err);
  };
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
