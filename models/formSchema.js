const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String, required: true },
    fieldTitle: { type: String },
    gender: { type: String, enum: ["female", "male", "other"] },
    imagePath: { type: String },
    bio: { type: String, maxlength: 1000 }
  },
  education: [
    {
      degree: { type: String },
      institution: { type: String },
      city: {type: String },
      graduation: { type: Date }
    }
  ],
  workExperience: [
    {
      jobTitle: { type: String },
      company: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      jobDescription: { type: String, maxlength: 1000 }
    }
  ],
  projects: [
    {
      projectName: { type: String, maxlength: 2000 },
      projectLink: { type: String }
    }
  ],
  skills: { type: [String] }, 
  contactInfo: {
    email: { type: String, required: true, match: /.+\@.+\..+/ }, 
    phone: { type: String }
  },
  socialMedia: {
    linkedin: { type: String },
    github: { type: String },
    website: { type: String }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Form', formSchema);
