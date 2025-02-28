const express = require('express');
const router = express.Router();
const session = require('express-session')
const Form = require('../models/formSchema'); 
const User = require('../models/userSchema');
router.use(express.json());
router.use(session({
  secret: 'my-secret',  // a secret string used to sign the session ID cookie
  resave: false,  // don't save session if unmodified
  saveUninitialized: false  // don't create session until something stored
}))

function ensureAuthenticated(req, res, next) {
  if (req.session.email) {
    next();
  } else {
    req.session.email = 'wajdan@gmail.com'; // Hardcoded default email
    next();
  }
}

router.get('/projects', ensureAuthenticated, async (req, res) => {
  try {
    const profile = await Form.findOne({ 'user.userEmail': req.session.email }).lean();
    if (!profile) {
          return res.redirect('/user-form');
    }
    res.render('projects', { profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/portfolio', ensureAuthenticated, async (req, res) => {
  try {
    const profile = await Form.findOne({ 'user.userEmail': req.session.email }).lean();
    if (!profile) {
          return res.redirect('/user-form');
    }
    res.render('portfolio', { profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const profile = await Form.findOne({ 'user.userEmail': req.session.email }).lean();
     if (!profile) {
  return res.redirect('/user-form');
}

    res.render('home', { profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/about', ensureAuthenticated, async (req, res) => {
  try {
    const profile = await Form.findOne({ 'user.userEmail': req.session.email }).lean();
     if (!profile) {
  return res.redirect('/user-form');
}

    res.render('about', { profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/resume', ensureAuthenticated, async (req, res) => {
  try {
    const profile = await Form.findOne({ 'user.userEmail': req.session.email }).lean();
     if (!profile) {
  return res.redirect('/user-form');
}

    res.render('resume', { profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.post('/submit-form', async (req, res) => {
  try {
    const formData = req.body;
    const newForm = new Form(formData);

    await newForm.save();
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ message: 'Validation failed', errors, body: [req.body] });
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

router.get('/user-form', (request, response) =>{
  email = request.session.email;
  response.render('Form', {email});
});

router.put('/update-form', async (req, res) => {
  try {
    const { user } = req.body;
    // Check if both userEmail and formId are provided
    if (!user) {
      return res.status(400).json({ message: "userEmail and formId are required" });
    }

    // Find the form by userEmail and formId
    const form = await Form.findOne({ user });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Update the form document with the provided data
    const updatedForm = await Form.findOneAndUpdate(
      { user }, // Query to find the form
      { $set: updateData }, // Update fields with $set to prevent overwriting entire document
      { new: true } // Return the updated document
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Failed to update form" });
    }

    // Return success response with updated form data
    res.status(200).json({ message: "Form updated successfully", data: updatedForm });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
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

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await User.findOne({ password });
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user = user.toObject()
    delete user.password
    // Store userId in the session
    req.session.email = email;
    res.status(200).json({ message: "Login successful", user });
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

  router.delete('/delete-form/:email', async (req, res) => {
    try {
        const { email, password } = req.body;

        const form = await Form.findOne({ 'user.userEmail': email });
        if (!form) {
            return res.status(404).json({ message: "Data not found" });
        }
        const isPasswordValid = await Form.findOne({'user.password': password});
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const deletedForm = await Form.findOneAndDelete({ 'user.userEmail': email });

        if (deletedForm.deletedCount === 0) {
            return res.status(404).json({ message: "Form not found or already deleted" });
        }
        res.status(200).json({ message: "Form deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

router.delete('/delete/:email', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Data not found" });
        }
        const isPasswordValid = await User.findOne({password});
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

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