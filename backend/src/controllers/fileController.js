const fileService = require("../services/fileService");

const uploadFile = async (req, res) => {
  try {
    const userId = req.params.userId; // Obtener el userId desde los parámetros de la URL
    if (!userId) {
      return res.status(400).json({ error: "Se requiere un userId" });
    }

    // Llamar al servicio para subir el archivo, pasando el userId
    await fileService.uploadFile(req, userId);

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

const getStorage = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Se requiere un userId" });
    }

    const { total, used } = await fileService.getStorage(userId);

    res.status(200).json({ total, used });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const urlDownload = async (req, res) => {
  try {
    const { fileId } = req.params;

    if (!fileId) {
      return res.status(400).json({ error: "Se requiere un fileId" });
    }

    const respuesta = await fileService.getDownloadUrl(fileId);

    const contentType = respuesta.headers["content-type"];
    const fileName = respuesta.headers["x-bz-file-name"];

    // Configurar los encabezados de la respuesta para que se descargue el archivo
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    // Enviar el archivo como un stream al cliente
    respuesta.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*const trackUploadProgress = (req, res) => {
  const { userId } = req.params;

  // Configurar los encabezados para SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Agrega el cliente al mapa de clientes
  clients.set(userId, res);

  // Elimina el cliente al cerrar la conexión
  req.on("close", () => {
    clients.delete(userId);
  });
};

// Función para enviar el progreso a los clientes conectados
const sendProgressUpdate = (userId, progress) => {
  const client = clients.get(userId);
  if (client) {
    client.write(`data: ${progress}\n\n`);

    // Si el progreso llega al 100%, se envía un evento "end"
    if (progress === 100) {
      client.write("event: end\n");
      client.write("data: done\n\n");
      client.end();
    }
  }
};*/

module.exports = {
  uploadFile,
  getFiles,
  deleteFile,
  getStorage,
  urlDownload,
  //trackUploadProgress,
  //sendProgressUpdate,
};
