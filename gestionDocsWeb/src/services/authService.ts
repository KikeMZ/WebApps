import { auth } from "./firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
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
      throw new Error("Credenciales de acceso inválidas");
    } else {
      throw new Error("Error desconocido");
    }
  }
};

// Recuperación de contraseña
export const resetPassword = async (email: string) => {
  return await axios.post(`${API_URL}/forgot-password`, { email });
};

export const logout = async () => {
  const auth = getAuth();

  try {
    return signOut(auth);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error("Error:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Error desconocido al cerrar sesión");
      throw new Error("Error desconocido");
    }
  }
};

// Obtener el userId de la sesión actual
export const getCurrentUserId = async (): Promise<string | null> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return user.uid; // Devuelve el UID del usuario autenticado
  } else {
    return null; // Si no hay usuario autenticado, devuelve null
  }
};
