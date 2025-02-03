const B2 = require("backblaze-b2");

const b2 = new B2({
  applicationKeyId: process.env.B2_APP_KEY_ID,
  applicationKey: process.env.B2_APP_KEY,
});

// Autorizar y exportar la instancia de B2
const initializeB2 = async () => {
  try {
    await b2.authorize(); // Autorizar antes de usar
    return b2;
  } catch (err) {
    console.error("Error autorizando Backblaze B2:", err);
    throw err;
  }
};

module.exports = { initializeB2 };
