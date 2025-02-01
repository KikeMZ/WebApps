import { auth } from "./firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:3000/api/auth";

// Registro de usuario
export const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
      username,
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
};

// Inicio de sesión
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken(); // Obtener el token de autenticación
    return idToken;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error("Error en login:", error.message);
      throw new Error("Error al intentar iniciar sesión");
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};

// Recuperación de contraseña
export const resetPassword = async (email: string) => {
  return await axios.post(`${API_URL}/forgot-password`, { email });
};
