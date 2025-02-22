const { db } = require("../config/firebase");

const getUserData = async (userId) => {
  try {
    const snapshot = await db.ref(`users/${userId}`).once("value");

    if (!snapshot.exists()) {
      return null;
    }

    const userData = snapshot.val();
    // Copia los datos del usuario sin la sublista "archivos"
    const { files, ...filteredUserData } = userData;
    
    return filteredUserData;
  } catch (error) {
    throw new Error(`Error obteniendo archivos: ${error.message}`);
  }
};

module.exports = {
  getUserData,
};
