const admin = require("firebase-admin");

const register = async (email, password, username) => {
  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });

    // Estructura del usuario para la base de datos
    const userData = {
      username,
      email,
      dateCuenta: new Date().toISOString(),
      profilePicture: "url", // Puedes cambiarlo si tienes una imagen por defecto
    };

    await admin.database().ref(`users/${user.uid}`).set(userData);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (idToken) => {
  try {
    // Verifica el token de autenticación enviado por el frontend
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const userSnapshot = await admin
      .database()
      .ref(`users/${decodedToken.uid}`)
      .once("value");
    const userData = userSnapshot.val();

    if (!userData) {
      throw new Error("Usuario no encontrado en la base de datos");
    }

    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      username: userData.username,
    };
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};

const resetPassword = async (email) => {
  try {
    // Verifica si el usuario existe en Firebase antes de enviar el enlace
    const userRecord = await admin.auth().getUserByEmail(email);
    if (!userRecord) {
      throw new Error("El usuario no está registrado.");
    }

    // Enviar el correo de recuperación de contraseña
    await admin.auth().generatePasswordResetLink(email);
    return { message: `Correo de recuperación enviado correctamente a email: ${email}` };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { register, login, resetPassword };
