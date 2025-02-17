import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FileList from "../components/FileList";
import StorageBar from "../components/StorageBar";
import Toolbar from "../components/ToolBar";
import FileDetailSlider from "../components/FileDetailSlider";
import { logout } from "../services/authService";
import "../services/fileService";
import {
  fetchFiles,
  fetchStorageInfo,
  handleNewUpload,
} from "../services/fileService";
import ProgressBar from "../components/progressBar";

interface StoredFile {
  type: "pdf" | "document" | "spreadsheet";
  id: string;
  name: string;
  fileSize: number;
  fileType: string;
  url: string;
  createdAt: string;
}

const Dashboard = () => {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<StoredFile[]>([]);
  const [storage, setStorage] = useState({ total: 0, used: 0 });
  const [filter, setFilter] = useState<
    "all" | "pdf" | "document" | "spreadsheet"
  >("all");

  const [uploadProgress, setUploadProgress] = useState(0);

  const [selectedFile, setSelectedFile] = useState<StoredFile | null>(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();

    // Agregar listener para actualizar la información tras una subida
    const handleFileUploaded = () => {
      loadData();
      setUploadProgress(0);
    };

    // Listener para actualizar el progreso de la subida
    const handleUploadProgress = (event: Event) => {
      const customEvent = event as CustomEvent<number>;
      setUploadProgress(customEvent.detail);
    };

    // Agrega los listeners
    document.addEventListener("file-uploaded", handleFileUploaded);
    document.addEventListener("upload-progress", handleUploadProgress);

    // Limpia los listeners al desmontar el componente
    return () => {
      document.removeEventListener("file-uploaded", handleFileUploaded);
      document.removeEventListener("upload-progress", handleUploadProgress);
    };
  }, []);

  // Función para manejar el cambio de filtro
  const handleFilterChange = (
    type: "all" | "pdf" | "document" | "spreadsheet"
  ) => {
    setFilter(type);
    if (type === "all") setFilteredFiles(files);
    else setFilteredFiles(files.filter((file) => file.type === type));
  };

  const handleConfig = () => {
    // window.location.href = "/config";
    console.log("Configuración");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Error inesperado");
    }
  };

  const handleFileClick = async (file: StoredFile) => {
    setSelectedFile(file);
    setIsSliderOpen(true);
  };

  const handleCloseSlider = () => {
    setIsSliderOpen(false);
  };

  const loadData = async () => {
    const fetchedFiles = await fetchFiles();
    setFiles(fetchedFiles);
    setFilteredFiles(fetchedFiles);

    const storageData = await fetchStorageInfo();
    setStorage(storageData);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 overflow-auto p-4">
      <Toolbar
        onFilterChange={handleFilterChange}
        onNewUpload={handleNewUpload}
        onConfig={handleConfig}
        onLogout={handleLogout}
        selectedFilter={filter}
      />
      {uploadProgress > 0 && uploadProgress < 100 && (
        <ProgressBar progress={uploadProgress} />
      )}
      <FileList files={filteredFiles} onFileClick={handleFileClick} />
      <StorageBar total={storage.total} used={storage.used} />

      {/* Panel Deslizante */}
      {isSliderOpen && selectedFile && (
        <FileDetailSlider
          file={selectedFile}
          onClose={handleCloseSlider}
          onUpdateDelete={loadData}
        />
      )}
    </div>
  );
};

export default Dashboard;
