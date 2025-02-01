const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = await authService.register(email, password, username);
    res.status(201).json({ message: "Usuario registrado", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { idToken  } = req.body;
    const user  = await authService.login(idToken);
    res.status(200).json({ message: "Login exitoso", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.resetPassword(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login, forgotPassword };
