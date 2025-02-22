const userService = require("../services/userService");

const getUserData = async (req, res) => {
  try {
    const userId = req.params.userId; // Obtener el userId desde los parámetros de la URL

    if (!userId) {
      return res.status(400).json({ error: "Se requiere un userId" });
    }

    const datos = await userService.getUserData(userId);

    return res.status(200).json({ datos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserData };
