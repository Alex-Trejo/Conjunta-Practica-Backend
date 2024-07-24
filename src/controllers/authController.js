const User = require('../models/userModel'); // Asegúrate de que no haya un espacio extra en el nombre del archivo
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Importar bcrypt

// Función para comparar contraseñas en el modelo User
// Esta función debería estar en el archivo de modelo, no en el controlador
// Elimina esta función del controlador y asegúrate de que esté en el archivo del modelo

// exports.comparePassword = async (candidatePassword, password) => {
//   const isMatch = await bcrypt.compare(candidatePassword, password);
//   return isMatch;
// };

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Crear el usuario
    const user = await User.create({ email, password });

    // Generar el token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Responder con el token
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Encontrar el usuario
    const user = await User.findOne({ email });

    // Verificar el usuario y la contraseña
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Responder con el token
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
