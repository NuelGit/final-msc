const express = require("express");
const multer = require("multer");
const { encrypt, getAES } = require("../services/encryptionService");
const { s3Uploadv2 } = require("../services/s3Service");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 40000000 } });

router.post("/api/upload", upload.single("file"), async (req, res) => {
  // Genereate AES
  const aes = getAES();

  // Use AES to encrypt file
  req.file.buffer = (
    await encrypt(req.file.buffer, Buffer.from(aes))
  ).encryptedData;

  // Upload encrypted file to S3
  const { file, uuid } = await s3Uploadv2(req, res);

  // Send DEK to frontend
  return res.json({ status: "success", aes: aes.toString("hex"), uuid: uuid });
});

module.exports = router;
