const fileService = require("../services/fileService");

const uploadFile = async (req, res) => {
  try {
    const result = await fileService.uploadFile(req);
    res.status(200).json({ message: "Archivo subido con éxito", ...result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await fileService.getFiles();
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { id, name } = req.body;
    await fileService.deleteFile(id, name);
    res.status(200).json({ message: "Archivo eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadFile, getFiles, deleteFile };
