const mongoose = require('mongoose');
const User = require('./src/models/userModel'); // Ajusta la ruta según la ubicación de tu modelo
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const checkUserPassword = async () => {
  try {
    const user = await User.findOne({ email: 'an@gmail.com' });
    if (user) {
      console.log('User found:', user);
      const isMatch = await bcrypt.compare('123456789', user.password);
      console.log(`Password match: ${isMatch}`);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error checking password:', error);
  } finally {
    mongoose.connection.close();
  }
};

checkUserPassword();
