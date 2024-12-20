const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/ 
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  securityQuestion: {
    type: String,
    required: true,
    enum: [
      "friend",
      "school",
      "city"
    ]
  },
  securityAnswer: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
  updatedAt: {
    type: Date,
    default: Date.now 
  }
});

module.exports = mongoose.model('User', userSchema);