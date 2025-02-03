const fileService = require("../services/fileService");

const uploadFile = async (req, res) => {
  try {
    const userId = req.params.userId; // Obtener el userId desde los parámetros de la URL
    if (!userId) {
      return res.status(400).json({ error: "Se requiere un userId" });
    }

    // Llamar al servicio para subir el archivo, pasando el userId
    const result = await fileService.uploadFile(req, userId);

    return res.status(200).json({ message: "Archivo subido con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getFiles = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Se requiere un userId" });
    }

    const files = await fileService.getFiles(userId);

    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { userId, fileId } = req.params; // Obtener userId y fileId desde los parámetros de la URL

    if (!userId || !fileId) {
      return res.status(400).json({ error: "Se requiere un userId y fileId" });
    }

    // Llamar al servicio para eliminar el archivo
    await fileService.deleteFile(userId, fileId);

    res.status(200).json({ message: "Archivo eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadFile, getFiles, deleteFile };
