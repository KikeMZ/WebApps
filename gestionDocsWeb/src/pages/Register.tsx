import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Repassword, setRepassword] = useState("");

  const handleRegister = async () => {
    try {
      if (!username) {
        alert("Ingresa tu nombre de usuario");
        return; // Evita que continúe con el registro
      }

      if (!email) {
        alert("Ingresa tu correo electrónico");
        return; 
      }

      if (password !== Repassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      await registerUser(email, password, username);
      alert("Registro exitoso, ahora inicia sesión");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen bg-gray-100 overflow-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 sm:mt-20">
        <h2 className="text-2xl font-semibold text-center mb-6">Registro</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Nombre de Usuario
          </label>
          <input
            type="text"
            placeholder="Nombre Usuario"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-500"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Correo Electrónico
          </label>
          <input
            type="email"
            placeholder="Correo Electrónico"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-500"
            onChange={(e) => setRepassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-2 my-3 mt-5 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Registrarse
        </button>

        <p className="text-center text-gray-600 mt-4 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
