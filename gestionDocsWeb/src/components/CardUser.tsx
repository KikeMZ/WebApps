import { useState, useEffect } from "react";

import { fetchUserData } from "../services/userService";

interface userData {
  username: string;
  dateCuenta: string;
  email: string;
  storageLimit: number;
  profilePicture: string;
}

const CardUser = () => {
  const [datos, setUserData] = useState<userData | null>(null);

  useEffect(() => {
    loadDataUser();
  }, []);

  const loadDataUser = async () => {
    try {
      const fetchedData = await fetchUserData();
      setUserData(fetchedData);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  const fechaFormateada = datos?.dateCuenta
    ? new Date(datos.dateCuenta).toLocaleString("es-ES", {
        dateStyle: "long",
      })
    : "Fecha no disponible";

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        {/* Imagen de perfil */}
        <div className="w-32 h-32 bg-gray-400 rounded-full mx-auto mb-4 overflow-hidden">
          <img
            src={datos?.profilePicture}
            alt="Foto de perfil"
            className="object-cover"
          />
        </div>

        {/* Nombre */}
        <h2 className="text-xl font-bold">{datos?.username}</h2>
        <p className="text-gray-500 text-sm">Registro {fechaFormateada}</p>

        {/* Datos del usuario */}
        <div className="mt-4 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Correo Registrado:</span>{" "}
            {datos?.email}
          </p>
          <p>
            <span className="font-semibold">Limite de Espacio:</span>{" "}
            {datos?.storageLimit} GB
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardUser;
