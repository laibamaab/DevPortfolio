const express = require('express');
const router = express.Router();
const Form = require('../models/formSchema'); 
const User = require('../models/userSchema');

router.post('/submit-form', async (req, res) => {
  try {
    const formData = req.body;

    const newForm = new Form(formData);

    await newForm.save();
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ message: 'Validation failed', errors });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
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

router.get('/education', async (req, res) => {
  try {
    const profile = await Form.findById('6767758db6f11b9edf45975b').lean();
    if (!profile) {
      return res.status(404).send('Profile not found');
    }

    res.render('education', { profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/', async (req, res) => {
  try {
    const profile = await Form.findById('6767758db6f11b9edf45975b').lean();
    if (!profile) {
      return res.status(404).send('Profile not found');
    }

    res.render('home', { profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/about', async (req, res) => {
  try {
    const profile = await Form.findById('6767758db6f11b9edf45975b').lean();
    if (!profile) {
      return res.status(404).send('Profile not found');
    }

    res.render('about', { profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/skills', async (req, res) => {
  try {
    const profile = await Form.findById('6767758db6f11b9edf45975b').lean();
    if (!profile) {
      return res.status(404).send('Profile not found');
    }

    res.render('skills', { profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/projects', async (req, res) => {
  try {
    const profile = await Form.findById('6767758db6f11b9edf45975b').lean();
    if (!profile) {
      return res.status(404).send('Profile not found');
    }

    res.render('projects', { profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/resume', async (req, res) => {
  try {
    const profile = await Form.findById('6767758db6f11b9edf45975b').lean();
    if (!profile) {
      return res.status(404).send('Profile not found');
    }

    res.render('resume', { profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/experience', async (req, res) => {
  try {
    const profile = await Form.findById('6767758db6f11b9edf45975b').lean();
    if (!profile) {
      return res.status(404).send('Profile not found');
    }

    res.render('education', { profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.put('/submit-form/:email', async (req, res) => {
  try {
      const user = await User.findOne({ email: req.params });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const updatedForm = await Form.findOneAndUpdate(
          { userId: user._id }, 
          req.body, 
          { new: true } 
      );

      if (!updatedForm) {
          return res.status(404).json({ message: "Form not found" });
      }

      res.status(200).json({ message: "Form updated successfully", data: updatedForm });
  } catch (error) {
      res.status(400).json({ message: "Error updating form", error: error.message });
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

router.get('/users', async (req, res) => {
  try {
    const user = await User.find();
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

router.delete('/delete/:email', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await User.findOne({password});
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        await Form.deleteOne({ userId: user._id });

        const deletedUser = await User.deleteOne({ email });

        if (deletedUser.deletedCount === 0) {
            return res.status(404).json({ message: "User not found or already deleted" });
        }
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

module.exports = router;