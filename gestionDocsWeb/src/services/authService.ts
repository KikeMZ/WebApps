import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

const API_URL = "https://tu-backend.com/api/auth";

// Registro de usuario
export const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  return await axios.post(`${API_URL}/register`, { email, password, username });
};

// Inicio de sesión
export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Recuperación de contraseña
export const resetPassword = async (email: string) => {
  return await axios.post(`${API_URL}/forgot-password`, { email });
};
