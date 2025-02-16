import {
  FaFileAlt,
  FaFilePdf,
  FaFileExcel,
  FaTrash,
  FaDownload,
  FaEdit,
} from "react-icons/fa";

import { download } from "./../services/fileService";

interface StoredFile {
  type: "pdf" | "document" | "spreadsheet";
  id: string;
  name: string;
  fileSize: number;
  fileType: string;
  url: string;
  createdAt: string;
}

const fileIcons = {
  document: <FaFileAlt className="text-blue-500 text-6xl" />,
  pdf: <FaFilePdf className="text-red-500 text-6xl" />,
  spreadsheet: <FaFileExcel className="text-green-500 text-6xl" />,
};

interface FileDetailSliderProps {
  file: StoredFile;
  onClose: () => void;
}

const handleDownload = async (file: StoredFile) => {
  try {
    const response = await download(file.id);

    if (!response) {
      return;
    }
    
    // Crear un enlace de descarga temporal
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
  }
};

const FileDetailSlider = ({ file, onClose }: FileDetailSliderProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl p-6 rounded-t-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Detalles del Archivo</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-black">
          ✖
        </button>
      </div>

      <div className="flex items-center space-x-4 mt-4">
        {fileIcons[file.type] || (
          <FaFileAlt className="text-gray-500 text-6xl" />
        )}
        <div>
          <p className="text-lg font-semibold">{file.name}</p>
          <p className="text-sm text-gray-500">
            Tipo: {file.fileType.toUpperCase()}
          </p>
          <p className="text-sm text-gray-500">
            Fecha de subida: {file.createdAt}
          </p>
          <p className="text-sm text-gray-500">
            Tamaño: {file.fileSize.toFixed(2)} MB
          </p>
        </div>
      </div>

      <div className="flex justify-around mt-6">
        <button className="flex items-center px-2 py-2 bg-red-500 text-white rounded-3xl hover:bg-red-600">
          <FaTrash className="mr-2" /> Eliminar
        </button>
        <button
          className="flex items-center px-2 py-2 bg-indigo-500 text-white rounded-3xl hover:bg-indigo-600"
          onClick={() => handleDownload(file)}
        >
          <FaDownload className="mr-2" /> Descargar
        </button>
        <button className="flex items-center px-2 py-2 bg-gray-400 text-white rounded-3xl hover:bg-gray-500">
          <FaEdit className="mr-2" /> Editar
        </button>
      </div>
    </div>
  );
};

export default FileDetailSlider;
