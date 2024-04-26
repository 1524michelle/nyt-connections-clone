const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true // Ensure each ID is unique
  },
  name: {
    type: String,
    required: true
  },
  rows: {
    type: [
      {
        category: { type: String, required: true },
        words: {
          type: [String],
          required: true,
          validate: [arrayLengthValidator, 'Each row must contain exactly 4 words']
        },
        difficulty: {
          type: String,
          enum: ['easy', 'medium', 'hard', 'extrahard'],
          required: true
        }
      }
    ],
    validate: [arrayLengthValidator, 'Connection must have exactly 4 rows']
  }
});

// Validator function to ensure each connection has exactly 4 rows, each row contains exactly 4 words
function arrayLengthValidator(val) {
  return val.length === 4;
}

const Connection = mongoose.model('Connection', connectionSchema, 'connections'); // specify connections collection

module.exports = Connection;
