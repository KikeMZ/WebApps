import axios from "axios";
import { getCurrentUserId } from "./authService";

const API_URL = "http://localhost:3000/api";

export const fetchUserData = async () => {
  try {
    const userId = await getCurrentUserId();
    const res = await axios.get(`${API_URL}/user/${userId}`);
    return res.data.datos;
  } catch (error) {
    console.error("Error al cargar la información de almacenamiento:", error);
    return [];
  }
};
