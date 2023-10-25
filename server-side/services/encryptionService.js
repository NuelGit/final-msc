require("dotenv").config();
const crypto = require("crypto");

// const idea = process.env.SECRET;
const idea = crypto.randomBytes(16);// Encrypting with IDEA 128 bits
const des = "aes-256-cbc";
// const algorithm = "aes-256-cbc";

// Convert Initialization Vector from a string to a buffer
const vector = Buffer.from(idea, "hex");

exports.getAES = () => crypto.randomBytes(32);

exports.encrypt = async (buff, aes) => {
  let cipher = crypto.createCipheriv(des, aes, vector);
  let encrypted = cipher.update(buff);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { vector: vector.toString("hex"), encryptedData: encrypted.toString("hex") };
};

exports.decrypt = async (buff, aes) => {
  let encryptedText = Buffer.from(buff, "hex");
  let decipher = crypto.createDecipheriv(des, aes, vector);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted;
};
