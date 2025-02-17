import { useState } from "react";

import {
  FaFileAlt,
  FaFilePdf,
  FaFileExcel,
  FaTrash,
  FaDownload,
  FaEdit,
} from "react-icons/fa";

import { download, deleteFile, updateFile } from "../services/fileService";

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
  onUpdateDelete: () => void;
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

const FileDetailSlider = ({
  file,
  onClose,
  onUpdateDelete,
}: FileDetailSliderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<StoredFile | null>(null);

  const [fileToEdit, setFileToEdit] = useState<StoredFile | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const fecha = new Date(file.createdAt);
  const fechaFormateada = fecha.toLocaleString("es-ES", {
    timeStyle: "medium",
    dateStyle: "long",
  });

  const handleDelete = async (file: StoredFile) => {
    setFileToDelete(file);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!fileToDelete) return;

    try {
      await deleteFile(fileToDelete.id);
      setIsModalOpen(false);
      setFileToDelete(null);
      onClose(); // Cierra el slider después de eliminar
      onUpdateDelete();
    } catch (error) {
      console.error("Error al eliminar el archivo:", error);
    }
  };

  const handleUpdate = async (file: StoredFile) => {
    setFileToEdit(file);
    setNewFileName(file.name); // Carga el nombre actual
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (fileToEdit && newFileName) {
      try {
        await updateFile(fileToEdit, newFileName);
        onClose();
        onUpdateDelete(); // Recargar la lista de archivos
      } catch (error) {
        console.error("Error al actualizar el nombre:", error);
      }
    }
  };

  return (
    <>
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
              Fecha de subida: {fechaFormateada}
            </p>
            <p className="text-sm text-gray-500">
              Tamaño: {file.fileSize.toFixed(2)} MB
            </p>
          </div>
        </div>

        <div className="flex justify-around mt-6">
          <button
            className="flex items-center px-2 py-2 bg-red-500 text-white rounded-3xl hover:bg-red-600"
            onClick={() => handleDelete(file)}
          >
            <FaTrash className="mr-2" /> Eliminar
          </button>
          <button
            className="flex items-center px-2 py-2 bg-indigo-500 text-white rounded-3xl hover:bg-indigo-600"
            onClick={() => handleDownload(file)}
          >
            <FaDownload className="mr-2" /> Descargar
          </button>
          <button
            className="flex items-center px-2 py-2 bg-gray-400 text-white rounded-3xl hover:bg-gray-500"
            onClick={() => handleUpdate(file)}
          >
            <FaEdit className="mr-2" /> Editar
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="pointer-events-auto fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-30">
          <div className="w-[250px] flex flex-col p-4 relative items-center justify-center bg-white-800 border border-gray-800 shadow-lg rounded-2xl">
            <div className="text-center p-3 flex-auto justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 flex items-center text-gray-600 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <h2 className="text-xl font-bold py-4 text-black-200">
                ¿Estás seguro?
              </h2>
              <p className="text-sm text-gray-500 px-2">
                Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="p-2 mt-2 text-center space-x-1 md:block">
              <button
                className="mb-2 md:mb-0 px-5 py-2 text-sm shadow-xl font-medium text-black-300 rounded-full hover:bg-gray-300 transition ease-in duration-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white shadow-xl rounded-full transition ease-in duration-300"
                onClick={confirmDelete}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && fileToEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Editar Nombre</h2>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded mb-4"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  await handleSaveEdit();
                  setIsEditModalOpen(false);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileDetailSlider;
