const b2 = require("../config/backblaze");
const db = require("../config/firebase");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const Busboy = require("busboy");

const bucketName = process.env.B2_BUCKET_NAME;

const uploadFile = (req) => {
  return new Promise((resolve, reject) => {
    const busboy = new Busboy({ headers: req.headers });

    let fileBuffer = [];
    let fileName = "";

    busboy.on("file", (_, file, filename) => {
      fileName = filename;
      file.on("data", (data) => fileBuffer.push(data));
      file.on("end", async () => {
        try {
          const finalBuffer = Buffer.concat(fileBuffer);
          await b2.send(
            new PutObjectCommand({
              Bucket: bucketName,
              Key: fileName,
              Body: finalBuffer,
            })
          );

          const fileRef = db.ref("files").push();
          await fileRef.set({
            id: fileRef.key,
            name: fileName,
            url: `https://${bucketName}.s3.us-east-005.backblazeb2.com/${fileName}`,
            createdAt: Date.now(),
          });

          resolve({ id: fileRef.key, name: fileName });
        } catch (error) {
          reject(new Error(`Error subiendo archivo: ${error.message}`));
        }
      });
    });

    busboy.on("error", (error) =>
      reject(new Error(`Error en Busboy: ${error.message}`))
    );

    req.pipe(busboy);
  });
};

const getFiles = async () => {
  try {
    const snapshot = await db.ref("files").once("value");
    return snapshot.val() ? Object.values(snapshot.val()) : [];
  } catch (error) {
    throw new Error(`Error obteniendo archivos: ${error.message}`);
  }
};

const deleteFile = async (id, name) => {
  try {
    await b2.send(new DeleteObjectCommand({ Bucket: bucketName, Key: name }));
    await db.ref(`files/${id}`).remove();
    return { message: "Archivo eliminado con éxito" };
  } catch (error) {
    throw new Error(`Error eliminando archivo: ${error.message}`);
  }
};

module.exports = { uploadFile, getFiles, deleteFile };
