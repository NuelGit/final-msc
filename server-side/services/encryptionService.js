require("dotenv").config();
const crypto = require("crypto");

const initVector = process.env.SECRET;
const algorithm = "aes-256-cbc";

// Convert Initialization Vector from a string to a buffer
const vector = Buffer.from(initVector, "hex");

exports.getDek = () => crypto.randomBytes(32);

exports.encrypt = async (buff, dek) => {
  let cipher = crypto.createCipheriv(algorithm, dek, vector);
  let encrypted = cipher.update(buff);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { vector: vector.toString("hex"), encryptedData: encrypted.toString("hex") };
};

exports.decrypt = async (buff, dek) => {
  let encryptedText = Buffer.from(buff, "hex");
  let decipher = crypto.createDecipheriv(algorithm, dek, vector);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted;
};
