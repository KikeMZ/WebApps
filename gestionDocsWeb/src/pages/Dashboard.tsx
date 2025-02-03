import { useState, useEffect } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";

import FileList from "./FileList";
import StorageBar from "./StorageBar";
import Toolbar from "./toolBar";
import { logout } from "../services/authService";
import "../services/fileService";
import { fetchFiles, fetchStorageInfo, handleNewUpload } from "../services/fileService";

interface StoredFile  {
  name: string;
  type: "pdf" | "document" | "spreadsheet";
}

const Dashboard = () => {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<StoredFile[]>([]);
  const [storage, setStorage] = useState({ total: 0, used: 0 });
  const [filter, setFilter] = useState<
    "all" | "pdf" | "document" | "spreadsheet"
  >("all");

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const fetchedFiles = await fetchFiles();
      setFiles(fetchedFiles);
      setFilteredFiles(fetchedFiles);

      const storageData = await fetchStorageInfo();
      setStorage(storageData);
    };

    loadData();
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

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 overflow-auto p-4">
      <Toolbar
        onFilterChange={handleFilterChange}
        onNewUpload={handleNewUpload}
        onConfig={handleConfig}
        onLogout={handleLogout}
        selectedFilter={filter}
      />
      <FileList files={filteredFiles} />
      <StorageBar total={storage.total} used={storage.used} />
    </div>
  );
};

export default Dashboard;
