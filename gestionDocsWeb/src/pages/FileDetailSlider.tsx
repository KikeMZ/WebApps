import { FaFilePdf, FaTrash, FaDownload, FaEdit } from "react-icons/fa";

/*interface StoredFile {
  id: number;
  name: string;
  fileSize: number;
  fileType: string;
  url: string;
  createdAt: string;
}*/

interface StoredFile {
  name: string;
  type: "pdf" | "document" | "spreadsheet";
}

interface FileDetailSliderProps {
  file: StoredFile;
  onClose: () => void;
}

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
        <FaFilePdf className="text-red-500 text-6xl" />
        <div>
          <p className="text-lg font-semibold">{file.name}</p>
          <p className="text-sm text-gray-500">
            Tipo: {file.fileType.toUpperCase()}
          </p>
          <p className="text-sm text-gray-500">
            Fecha de subida: {file.createdAt}
          </p>
          <p className="text-sm text-gray-500">Tamaño: {file.fileSize}</p>
        </div>
      </div>

      <div className="flex justify-around mt-6">
        <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          <FaTrash className="mr-2" /> Eliminar
        </button>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <FaDownload className="mr-2" /> Descargar
        </button>
        <button className="flex items-center px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">
          <FaEdit className="mr-2" /> Editar
        </button>
      </div>
    </div>
  );
};

export default FileDetailSlider;
