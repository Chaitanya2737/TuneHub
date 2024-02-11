const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");
const { model } = require("mongoose");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;