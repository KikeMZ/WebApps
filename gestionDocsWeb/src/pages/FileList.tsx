import { FaFileAlt, FaFilePdf, FaFileExcel } from "react-icons/fa";

// Definir el tipo de archivo
interface StoredFile {
  name: string;
  type: "pdf" | "document" | "spreadsheet";
}

const fileIcons = {
  document: <FaFileAlt className="text-blue-500 text-3xl" />,
  pdf: <FaFilePdf className="text-red-500 text-3xl" />,
  spreadsheet: <FaFileExcel className="text-green-500 text-3xl" />,
};

interface FileListProps {
  files: StoredFile[]; // Definir correctamente que 'files' es un arreglo de objetos 'File'
  onFileClick: (file: StoredFile) => void;
}

const FileList = ({ files, onFileClick }: FileListProps) => {
  // Asegurarse de que 'files' nunca sea undefined o null
  const validFiles = files || [];

  return (
    <div className="w-full max-w-lg md:max-w-4xl bg-white p-4 rounded-lg shadow-md mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {validFiles.length > 0 ? (
          validFiles.map((file, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md shadow-md"
                onClick={() => onFileClick(file)}
              >
                {fileIcons[file.type] || (
                  <FaFileAlt className="text-gray-500 text-3xl" />
                )}
              </div>
              <span className="text-xs text-center mt-1">{file.name}</span>
            </div>
          ))
        ) : (
          <p>No se encuentran archivos</p>
        )}
      </div>
    </div>
  );
};

export default FileList;
