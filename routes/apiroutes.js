const express = require('express');
const router = express.Router();
const Form = require('../models/formSchema'); 
const User = require('../models/userSchema');

router.post('/form', async (req, res) => {
  try {
    const newForm = new Form(req.body); 
    const savedForm = await newForm.save();
    res.status(201).json({ message: "Form submitted successfully", data: savedForm });
  } catch (error) {
    res.status(400).json({ message: "Error submitting form", error: error.message });
  }
});

router.get('/form', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms", error: error.message });
  }
});

router.get('/form/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form", error: error.message });
  }
});

router.put('/form/:id', async (req, res) => {
  try {
    const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ message: "Form updated successfully", data: updatedForm });
  } catch (error) {
    res.status(400).json({ message: "Error updating form", error: error.message });
  }
});

router.delete('/form/:id', async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.id);
    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ message: "Form deleted successfully", data: deletedForm });
  } catch (error) {
    res.status(500).json({ message: "Error deleting form", error: error.message });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User(req.body); 
    const savedUser = await newUser.save();
    res.json({ message: "User registered successfully", data: savedUser });
  } catch (error) {
    console.error('Error during registration:', error); 
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await User.findOne({ password });
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -securityAnswer');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error: error.message });
  }
});

router.put('/forget/:email', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await User.findOneAndUpdate(
        { email: req.params.email }, 
        req.body, 
        { new: true } 
      );
  
      res.status(200).json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  });
  

router.delete('/user/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});

module.exports = router;
