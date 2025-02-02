import { useState, useEffect } from "react";
import axios from "axios";
import FileList from "./FileList";
import StorageBar from "./StorageBar";
import Toolbar from "./toolBar";

interface File {
  name: string;
  type: "pdf" | "document" | "spreadsheet";
}

const Dashboard = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<File[]>([]);
  const [storage, setStorage] = useState({ total: 0, used: 0 });
  const [filter, setFilter] = useState<
    "all" | "pdf" | "document" | "spreadsheet"
  >("all");

  useEffect(() => {
    axios
      .get<{ files: File[] }>("/api/files")
      .then((res) => {
        setFiles(res.data.files  || []);
        setFilteredFiles(res.data.files  || []);
      })
      .catch((error) => {
        console.error("Error al cargar los archivos:", error);
      });

    axios
      .get("/api/storage")
      .then((res) => {
        setStorage(res.data);
      })
      .catch((error) => {
        console.error(
          "Error al cargar la información de almacenamiento:",
          error
        );
      });
  }, []);

  // Función para manejar el cambio de filtro
  const handleFilterChange = (
    type: "all" | "pdf" | "document" | "spreadsheet"
  ) => {
    setFilter(type);
    if (type === "all") setFilteredFiles(files);
    else setFilteredFiles(files.filter((file) => file.type === type));
  };

  const handleNewUpload = () => {
    // Lógica para manejar la carga de nuevos archivos
    console.log("Nuevo upload");
  };

  const handleConfig = () => {
    // Lógica para manejar la configuración
    console.log("Configuración");
  };

  const handleLogout = () => {
    // Lógica para manejar el cierre de sesión
    console.log("Cierre de sesión");
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
