// create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors'); // cross origin resource sharing
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// store comments in memory
const commentsByPostId = {};

// get comments for postId
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// create comment for postId
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  // get comments for postId
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  // add new comment
  comments.push({ id: commentId, content, status: 'pending' });
  // set comments for postId
  commentsByPostId[req.params.id] = comments;
  // emit event
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId: req.params.id, status: 'pending' },
  });
  // send response
  res.status(201).send(comments);
});

// receive event
app.post('/events', async (req, res) => {
  console.log('Received event:', req.body.type);
  const { type, data } = req.body;
  // if comment was moderated
  if (type === 'CommentModerated') {
    const { id, postId, status, content } = data;
    // get comments for postId
    const comments = commentsByPostId[postId];
    // find comment
    const comment = comments.find((comment) => comment.id === id);
    // update comment status
    comment.status = status;
    // emit event
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: { id, content, postId, status },
    });
  }
  res.send({});
});

// start web server
const port = 4001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});