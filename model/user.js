const mongoose = require('mongoose');

// Updated database connection
mongoose
    .connect('mongodb://127.0.0.1:27017/') // Replace 'myDatabase' with your actual database name
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define the User schema
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    image_url: String, // Updated to match your form
});

// Export the model
module.exports = mongoose.model('User', userSchema);
