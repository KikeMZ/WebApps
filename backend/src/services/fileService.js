const { initializeB2 } = require("../config/backblaze");
const { db } = require("../config/firebase");
const busboy = require("busboy");

const bucketId = process.env.B2_BUCKET_ID;
const bucketName = process.env.B2_BUCKET_NAME;

const uploadFile = async (req, userId) => {
  const b2 = await initializeB2();

  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: req.headers });

    let fileBuffer = [];
    let fileName = "";
    let fileSize = 0;
    let fileType = "";

    if (!userId) {
      return reject(new Error("Se requiere un userId"));
    }

    bb.on("file", (fieldname, file, filename) => {
      fileName = filename.filename;
      fileType = filename.mimeType;
      file.on("data", (data) => {
        fileBuffer.push(data);
        fileSize += data.length; // Acumulamos el tamaño de cada chunk
      });

      file.on("end", async () => {
        try {
          const finalBuffer = Buffer.concat(fileBuffer);
          const fileSizeMB = fileSize / (1024 * 1024);

          // Obtener el espacio actual del usuario
          const { total, used } = await getStorage(userId);

          // Verificar si el archivo ya existe en la base de datos
          const fileSnapshot = await db
            .ref(`users/${userId}/files`)
            .orderByChild("name")
            .equalTo(fileName)
            .once("value");

          let existingFileSizeMB = 0;

          if (fileSnapshot.exists()) {
            const fileData = fileSnapshot.val();
            const fileId = Object.keys(fileData)[0];
            existingFileSizeMB = fileData[fileId].fileSize || 0;
          }

          const newUsed = used - existingFileSizeMB + fileSizeMB;

          if (newUsed > total) {
            return reject(
              new Error("Error subiendo archivo: Sin espacio suficiente")
            );
          }

          const response = await b2.getUploadUrl({
            bucketId: bucketId,
          });

          const authorizationToken = response.data.authorizationToken;
          const uploadUrl = response.data.uploadUrl;

          await b2.uploadFile({
            uploadUrl: uploadUrl,
            uploadAuthToken: authorizationToken,
            fileName: fileName,
            data: finalBuffer,
          });

          if (fileSnapshot.exists()) {
            // Si existe, actualiza el archivo
            const fileId = Object.keys(fileSnapshot.val())[0]; // Obtener el ID del archivo existente
            const fileRef = db.ref(`users/${userId}/files/${fileId}`);

            await fileRef.update({
              name: fileName,
              url: `https://f005.backblazeb2.com/${bucketName}/${fileName}`,
              updatedAt: Date.now(),
              fileType: fileType,
              fileSize: fileSizeMB,
            });

            resolve({ id: fileId, name: fileName });
          } else {
            // Si no existe, agrega el archivo
            const fileRef = db.ref(`users/${userId}/files`).push();
            await fileRef.set({
              id: fileRef.key,
              name: fileName,
              url: `https://f005.backblazeb2.com/${bucketName}/${fileName}`,
              createdAt: new Date().toISOString(),
              fileType: fileType,
              fileSize: fileSizeMB,
            });

            resolve({ id: fileRef.key, name: fileName });
          }
        } catch (error) {
          reject(new Error(`Error subiendo archivo: ${error.message}`));
        }
      });
    });

    bb.on("error", (error) =>
      reject(new Error(`Error en Busboy: ${error.message}`))
    );

    req.pipe(bb);
  });
};

const getFiles = async (userId) => {
  try {
    const snapshot = await db.ref(`users/${userId}/files`).once("value");

    if (!snapshot.exists()) {
      return [];
    }

    const filesData = snapshot.val();
    return Object.keys(filesData).map((fileId) => ({
      id: fileId,
      ...filesData[fileId],
    }));
  } catch (error) {
    throw new Error(`Error obteniendo archivos: ${error.message}`);
  }
};

const deleteFile = async (userId, fileId) => {
  const b2 = await initializeB2();

  try {
    const fileSnapshot = await db
      .ref(`users/${userId}/files/${fileId}`)
      .once("value");
    const file = fileSnapshot.val();

    if (!file) {
      throw new Error("Archivo no encontrado");
    }

    // Eliminar el archivo del servicio de almacenamiento
    await b2.deleteFileVersion({
      bucketId: bucketId,
      fileName: file.name,
    });

    // Eliminar el archivo de Firebase Database
    await db.ref(`users/${userId}/files/${fileId}`).remove();

    return { message: "Archivo eliminado con éxito" };
  } catch (error) {
    throw new Error(`Error eliminando archivo: ${error.message}`);
  }
};

const getStorage = async (userId) => {
  try {
    const snapshot = await db.ref(`users/${userId}/files`).once("value");
    let used = 0;

    if (snapshot.exists()) {
      const filesData = snapshot.val();

      used = Object.values(filesData).reduce(
        (acc, file) => acc + (file.fileSize || 0),
        0
      );
    }

    const storageSnapshot = await db
      .ref(`users/${userId}/storageLimit`)
      .once("value");

    const totalGB = storageSnapshot.val() || 0;
    const total = totalGB * 1024;

    return { total, used };
  } catch (error) {
    throw new Error("Error obteniendo datos");
  }
};

const getDownloadUrl = async (fileId) => {
  try {
    const b2 = await initializeB2();
    await b2.authorize();

    // Obtener la información del archivo
    const fileInfo = await b2.getFileInfo({ fileId });

    // Obtener autorización para descargar el archivo
    const authResponse = await b2.getDownloadAuthorization({
      bucketId: bucketId,
      fileNamePrefix: fileInfo.data.fileName,
      validDurationInSeconds: 500, // URL válida por 1 hora
    });

    // Construir la URL de descarga con autorización
    const downloadUrl = `https://api.backblazeb2.com/b2api/v2/b2_download_file_by_id?fileId=${fileId}&Authorization=${authResponse.data.authorizationToken}`;

    return downloadUrl;
  } catch (error) {
    throw new Error("Error");
  }
};

module.exports = {
  uploadFile,
  getFiles,
  deleteFile,
  getStorage,
  getDownloadUrl,
};
