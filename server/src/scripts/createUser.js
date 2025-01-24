const mongoose = require('mongoose');
const User = require('../models/user');
const connectDB = require('../config/database');

const createUser = async () => {
  try {
    await connectDB();

    const username = '';
    const password = '';

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('User already exists!');
      return;
    }

    const newUser = new User({ username, password });
    await newUser.save();

    console.log('User created successfully!');
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    mongoose.connection.close();
  }
};

createUser();