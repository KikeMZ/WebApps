import { useState } from "react";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, ingresa tu correo electrónico y contraseña.");
      return;
    }

    try {
      await loginUser(email, password);
      navigate("/dashboard"); // Redirigir a ruta protegida
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Error inesperado");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen bg-gray-100 overflow-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 sm:mt-20">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Iniciar Sesión
        </h2>
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

        <div className="text-right mb-5">
          <Link
            to="/recuperar"
            className="text-blue-600 hover:underline text-sm"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 my-2 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Iniciar Sesión
        </button>

        <p className="text-center text-gray-600 mt-4 text-sm">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/registro"
            className="text-blue-600 font-semibold hover:underline"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
