import { useState } from "react";
import { resetPassword } from "../services/authService";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (!email) {
      alert("Por favor, ingresa tu correo electrónico.");
      return;
    }

    try {
      await resetPassword(email);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //
    } finally {
      alert("Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen bg-gray-100 overflow-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 sm:mt-20">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Recuperar Contraseña
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

        <button
          onClick={handleResetPassword}
          className="w-full bg-black text-white py-2 my-2 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Restablecer Contraseña
        </button>

        <p className="text-center text-gray-600 mt-4 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
