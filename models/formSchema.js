const mongoose = require('mongoose');
const User = require('./userSchema');

const formSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  personalInfo: {
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    maritalStatus: { type: String, required: true },
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
      endDate: { type: mongoose.Schema.Types.Mixed },
      jobDescription: { type: String, maxlength: 1000 }
    }
  ],
  
projects: [
  {
    projectName: { type: String, maxlength: 100 },
    projectSummary: { type: String, maxlength: 2000 },
    projectImage: {type: String},
    projectLink: { type: String }
  }
],
skills: [
  {
    skillName: { type: String, required: true },
    skillSummary: { type: String, maxlength: 200 },
    skillImage: { type: String },
    level: { type: Number, required: true, min: 50, max: 100 }
  }
],
contactInfo: {
  email: { type: String, required: true, match: /.+\@.+\..+/ }, 
  phone: { type: String },
  address: { type: String }
},
socialMedia: {
  linkedin: { type: String },
  github: { type: String },
  youtube: { type: String },
  instagram: { type: String },
  twitter: { type: String }
},
createdAt: {
  type: Date,
  default: Date.now
}
});

module.exports = mongoose.model('Form', formSchema);