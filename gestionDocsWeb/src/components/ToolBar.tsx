import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaThLarge,
  FaPlus,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

type FilterType = "all" | "pdf" | "document" | "spreadsheet";

interface ToolbarProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onNewUpload: () => void;
  onConfig: () => void;
  onLogout: () => void;
}

const Toolbar = ({
  selectedFilter,
  onFilterChange,
  onNewUpload,
  onConfig,
  onLogout,
}: ToolbarProps) => {
  const filterOptions = [
    {
      type: "all" as const,
      label: "Todos",
      icon: <FaThLarge />,
      bg: "bg-neutral-100",
    },
    {
      type: "pdf" as const,
      label: "PDF",
      icon: <FaFilePdf />,
      bg: "bg-red-100",
    },
    {
      type: "document" as const,
      label: "Documentos",
      icon: <FaFileWord />,
      bg: "bg-sky-100",
    },
    {
      type: "spreadsheet" as const,
      label: "Hojas de Cálculo",
      icon: <FaFileExcel />,
      bg: "bg-green-100",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row w-full max-w-lg md:max-w-4xl gap-5 py-4 mt-4 justify-between">
      {/* Botones de filtros */}
      <div className="flex bg-white p-3 rounded-lg shadow-md gap-2 w-full md:max-w-3/4 justify-center">
        {filterOptions.map(({ type, label, icon, bg }) => (
          <button
            key={type}
            className={`bg-gray-300 px-4 py-2 rounded-md w-full md:w-1/4 flex items-center justify-center ${
              selectedFilter === type ? bg : ""
            }`}
            onClick={() => onFilterChange(type)}
          >
            <span className="md:hidden">{icon}</span>
            <span className="hidden md:flex">{label}</span>
          </button>
        ))}
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
