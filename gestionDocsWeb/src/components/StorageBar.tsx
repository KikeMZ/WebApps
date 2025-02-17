interface StorageBarProps {
  total: number;
  used: number;
}

const StorageBar = ({ total, used }: StorageBarProps) => {
  const free = total - used;
  const usedPercentage = Math.min((used / total) * 100, 100);

  return (
    <div className="w-full max-w-lg md:max-w-4xl bg-white p-4 rounded-lg shadow-sm mt-4">
      {/* Barra de progreso */}
      <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-md">
        {/* Porción ocupada */}
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${usedPercentage}%` }}
        ></div>
        {/* Texto superpuesto mostrando el porcentaje */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
          {usedPercentage.toFixed(2)}%
        </div>
      </div>

      {/* Datos generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Card Espacio Total */}
        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-blue-600">Espacio Total</h3>
          <p className="text-2xl font-bold text-blue-800">
            {(total / 1024).toFixed(2)} GB
          </p>
        </div>

        {/* Card Espacio Ocupado */}
        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-red-500">
          <h3 className="text-lg font-semibold text-red-600">
            Espacio Ocupado
          </h3>
          <p className="text-2xl font-bold text-red-800">
            {used.toFixed(2)} MB
          </p>
        </div>

        {/* Card Espacio Libre */}
        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-green-600">
            Espacio Libre
          </h3>
          <p className="text-2xl font-bold text-green-800">
            {free.toFixed(2)} MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default StorageBar;
