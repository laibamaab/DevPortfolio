const mongoose = require('mongoose');

// Skill Schema
const skillSchema = new mongoose.Schema({
  skillName: { type: String, required: true },
  skillSummary: { type: String, required: true },
  skillImage: { type: String, required: true },
  level: { type: Number, required: true }
});

// Education Schema
const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  city: { type: String, required: true },
  graduation: { type: Date, required: true }
});

// Work Experience Schema
const workExperienceSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: mongoose.Schema.Types.Mixed },
  jobDescription: { type: String, required: true }
});

// Project Schema
const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectSummary: { type: String, required: true },
  projectImage: { type: String, required: true },
  projectLink: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
});

const personalInfoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    cnic: { type: Number, required: true },
    maritalStatus: { type: String, required: true },
    fieldTitle: { type: String },
    gender: { type: String, enum: ["female", "male", "other"] },
    imagePath: { type: String },
    bio: { type: String, maxlength: 1000 }
});

const contactInfoSchema = new mongoose.Schema({
  email: { type: String, required: true, match: /.+\@.+\..+/ }, 
  phone: { type: String },
  address: { type: String }
});

const socialMediaSchema = new mongoose.Schema({
  linkedin: { type: String },
  github: { type: String },
  youtube: { type: String },
  instagram: { type: String },
  twitter: { type: String }
});

const formSchema = new mongoose.Schema({
  user: userSchema,
  personalInfo: personalInfoSchema,
  education: [educationSchema],
  workExperience: [workExperienceSchema],
  projects: [projectSchema],
  skills: [skillSchema],
  contactInfo: contactInfoSchema,
  socialMedia: socialMediaSchema,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Form', formSchema);