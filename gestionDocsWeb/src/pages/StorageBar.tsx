const StorageBar = ({ total, used }) => {
  const free = total - used;
  return (
    <div className="w-full max-w-lg md:max-w-4xl flex flex-col sm:flex-row gap-2 bg-white p-4 rounded-lg shadow-md mt-4">
      <div className="w-full sm:w-1/2 bg-blue-600 text-white text-center py-2 rounded-md">
        Espacio total: {total} GB
      </div>
      <div className="w-full sm:w-1/2 bg-gray-400 text-white text-center py-2 rounded-md">
        Espacio Ocupado: {used} GB
      </div>
      <div className="w-full sm:w-1/2 bg-green-500 text-white text-center py-2 rounded-md">
        Espacio Libre: {free} GB
      </div>
    </div>
  );
};

export default StorageBar;
