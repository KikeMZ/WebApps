import { FaPlus, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

interface ToolbarProps {
  onFilterChange: (type: "all" | "pdf" | "document" | "spreadsheet") => void; // Tipo de la función de filtro
  onNewUpload: () => void;
  onConfig: () => void;
  onLogout: () => void;
  selectedFilter: "all" | "pdf" | "document" | "spreadsheet";
}

const Toolbar = ({
  onFilterChange,
  onNewUpload,
  onConfig,
  onLogout,
  selectedFilter,
}: ToolbarProps) => {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-lg md:max-w-4xl gap-5 py-4 mt-4 justify-between">
      {/* Botones de filtros */}
      <div className="flex bg-white p-3 rounded-lg shadow-md gap-2 w-full md:max-w-3/4 justify-center">
        <button
          className={`bg-gray-300 px-4 py-2 rounded-md w-full md:w-1/4 ${
            selectedFilter === "all" ? "bg-neutral-100" : ""
          }`}
          onClick={() => onFilterChange("all")}
        >
          Todos
        </button>
        <button
          className={`bg-gray-300 px-4 py-2 rounded-md w-full md:w-1/4 ${
            selectedFilter === "pdf" ? "bg-red-100" : ""
          }`}
          onClick={() => onFilterChange("pdf")}
        >
          PDF
        </button>
        <button
          className={`bg-gray-300 px-4 py-2 rounded-md w-full md:w-1/4 ${
            selectedFilter === "document" ? "bg-sky-100" : ""
          }`}
          onClick={() => onFilterChange("document")}
        >
          Documentos
        </button>
        <button
          className={`bg-gray-300 px-4 py-2 rounded-md w-full md:w-1/4 ${
            selectedFilter === "spreadsheet" ? "bg-green-100" : ""
          }`}
          onClick={() => onFilterChange("spreadsheet")}
        >
          Hojas de Cálculo
        </button>
      </div>

      {/* Botones de acción */}
      <div className="flex bg-white p-3 rounded-lg shadow-md gap-2 w-full md:max-w-1/4 justify-center">
        <button
          className="bg-gray-300 p-2 rounded-md flex items-center justify-center w-1/3"
          onClick={onNewUpload}
        >
          <FaPlus />
        </button>
        <button
          className="bg-gray-300 p-2 rounded-md w-1/3 flex items-center justify-center"
          onClick={onConfig}
        >
          <FaUserCircle />
        </button>
        <button
          className="bg-gray-300 p-2 rounded-md w-1/3 flex items-center justify-center"
          onClick={onLogout}
        >
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
