// models/flow.js

const mongoose = require('mongoose');

const flowSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: false
  },
  title: {
    type: String,
    required: false
  },
  nodes: [
    {
      id: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      position: {
        type: Object,
        required: true
      },
      data: {
        type: Object,
        required: true
      }
    }
  ],
  edges: [
    {
      id: {
        type: String,
      },
      source: {
        type: String,
      },
      target: {
        type: String,
      },
      type: {
        type: String,
      }
    }
  ]
});

const flow = mongoose.model('flow', flowSchema);

module.exports = flow;
