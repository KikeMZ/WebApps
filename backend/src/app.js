const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const admin = require('firebase-admin');
const authRoutes = require('./routes/authRoutes');

// Cargar variables de entorno
dotenv.config();

// Inicializar Firebase
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`,
});

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(cors()); // Permitir solicitudes desde el frontend
app.use(helmet()); // Mejorar la seguridad
app.use(express.json()); // Parsear el cuerpo de las solicitudes JSON

// Rutas
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('¡Bienvenido al backend!');
  });

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});