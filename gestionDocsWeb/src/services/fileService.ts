import axios from "axios";
import { getCurrentUserId } from "./authService";

const API_URL = "http://localhost:3000/api";

interface StoredFile {
  id: string;
  name: string;
  type: "pdf" | "document" | "spreadsheet";
  fileType: string; // Tipo MIME de Firebase
  url: string;
}

const uploadInputRef = document.createElement("input");
uploadInputRef.type = "file";
uploadInputRef.style.display = "none";
document.body.appendChild(uploadInputRef);

const mapFileType = (mimeType: string): "pdf" | "document" | "spreadsheet" => {
  if (mimeType.includes("pdf")) return "pdf";
  if (
    mimeType.includes("word") ||
    mimeType.includes("msword") ||
    mimeType.includes("text")
  )
    return "document";
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel"))
    return "spreadsheet";
  return "document"; // Valor por defecto
};

export const fetchFiles = async (): Promise<StoredFile[]> => {
  try {
    const userId = await getCurrentUserId();
    const res = await axios.get<{ files: StoredFile[] }>(
      `${API_URL}/files/list/${userId}`
    );
    return res.data.files.map((file) => ({
      ...file,
      type: mapFileType(file.fileType),
    }));
  } catch (error) {
    console.error("Error al cargar los archivos:", error);
    return [];
  }
};

export const fetchStorageInfo = async () => {
  try {
    const res = await axios.get(`${API_URL}/files/storage`);
    return res.data;
  } catch (error) {
    console.error("Error al cargar la información de almacenamiento:", error);
    return { total: 0, used: 0 }; // Valor predeterminado en caso de error
  }
};

export const handleNewUpload = () => {
  uploadInputRef.click();
};

uploadInputRef.addEventListener("change", async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  showFloatingUploadButton(file);
});

// Función para mostrar el botón flotante cuando se selecciona un archivo
const showFloatingUploadButton = (file: File) => {
  const existingButton = document.getElementById("floating-upload-btn");
  if (existingButton) existingButton.remove();

  const button = document.createElement("button");
  button.id = "floating-upload-btn";
  button.innerText = "Subir Archivo";
  button.className =
    "fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg";
  button.onclick = () => uploadFile(file);
  document.body.appendChild(button);
};

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const userId = await getCurrentUserId();
    const response = await axios.post(
      `${API_URL}/files/upload/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Verificar si el código de estado indica éxito (200-299)
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error subiendo archivo: ${response.statusText}`);
    }

    console.log("Archivo subido con éxito", response.data);

    // Eliminar el botón flotante después de subir
    document.getElementById("floating-upload-btn")?.remove();
  } catch (error) {
    console.error(error);
  }
};

// Función para eliminar un archivo
export const deleteFile = async (fileId: string) => {
  try {
    const userId = await getCurrentUserId();
    const response = await axios.delete(
      `${API_URL}/files/delete/${userId}/${fileId}`
    );

    if (response.status === 200) {
      console.log("Archivo eliminado con éxito");
    } else {
      console.error("Error al eliminar el archivo");
    }
  } catch (error) {
    console.error("Error al eliminar el archivo:", error);
  }
};
