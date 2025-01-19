import mongoose from 'mongoose';
import User from './models/user.js';
import Thought from './models/thoughts.js';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/'
    );
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process if the connection fails
  }
};
connectDB();

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateRandomEmail = () => {
  return `${generateRandomString(5)}@${generateRandomString(5)}.com`;
};

const generateRandomSentence = (maxLength) => {
  const sentence = [];
  const words = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt'];
  const sentenceLength = Math.floor(Math.random() * 10) + 3; // sentence length between 3 and 12 words

  for (let i = 0; i < sentenceLength; i++) {
    sentence.push(words[Math.floor(Math.random() * words.length)]);
  }
  
  return sentence.join(' ').substring(0, maxLength);
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create 5 random users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const username = generateRandomString(8); // Generate a random username
      const email = generateRandomEmail(); // Generate a random email

      const user = await User.create({
        username,
        email,
      });
      users.push(user);
    }

    // Create 3 random friend connections
    for (let i = 0; i < 3; i++) {
      const userA = users[i];
      const userB = users[(i + 1) % users.length]; // Cycle through users

      // Add friends to each other's friends array
      await User.updateOne(
        { _id: userA._id },
        { $push: { friends: userB._id } }
      );
      await User.updateOne(
        { _id: userB._id },
        { $push: { friends: userA._id } }
      );
    }

    // Create 2 random thoughts for each user
    for (const user of users) {
      for (let i = 0; i < 2; i++) {
        const thoughtText = generateRandomSentence(280); // Thought text length capped at 280 characters
        const thought = await Thought.create({
          thoughtText,
          username: user.username,
          reactions: [
            {
              reactionBody: generateRandomSentence(280), // Reaction text
              username: generateRandomString(8), // Random username for reaction
            },
          ],
        });

        // Associate the thought with the user
        await User.updateOne(
          { _id: user._id },
          { $push: { thoughts: thought._id } }
        );
      }
    }

    console.log('Seed data created successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();
