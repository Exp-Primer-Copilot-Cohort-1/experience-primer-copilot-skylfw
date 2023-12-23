// create web server
const express = require("express");
const app = express();
const port = 3000;

// use body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// import comments.js
const comments = require("./comments.js");

// GET /comments
app.get("/comments", (req, res) => {
  res.json(comments);
});

// POST /comments
app.post("/comments", (req, res) => {
  const newComment = req.body;
  if (newComment) {
    comments.push({
      id: comments.length + 1,
      body: newComment.body,
      postId: 1,
    });
    res.json(comments);
  } else {
    res.status(400).json({ error: "Request body incomplete or missing" });
  }
});

// PUT /comments/:id
app.put("/comments/:id", (req, res) => {
  const commentId = req.params.id;
  const updateComment = req.body;

  if (updateComment) {
    const commentIndex = comments.findIndex(
      (comment) => comment.id === parseInt(commentId)
    );
    comments[commentIndex].body = updateComment.body;
    res.json(comments);
  } else {
    res.status(400).json({ error: "Request body incomplete or missing" });
  }
});

// DELETE /comments/:id
app.delete("/comments/:id", (req, res) => {
  const commentId = req.params.id;
  const commentIndex = comments.findIndex(
    (comment) => comment.id === parseInt(commentId)
  );
  comments.splice(commentIndex, 1);
  res.json(comments);
});

// start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
