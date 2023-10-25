import React, { useState } from "react";
import axios from "axios";
import { db } from '../firebase.config'
import { doc, setDoc } from "firebase/firestore";
import {UserAuth} from  '../hooks/UserContext'

const UploadFile = () => {
  // Define state variables
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");
  const [fileAes, setFileAes] = useState("");
  const {user} = UserAuth()
  // const { userData, isLoading } = useUser();

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to store DEK in Firestore
  const storeDEKInFirebase = async (filename, AES, email) => {
    const docRef = doc(db, "users", email);
    await setDoc(
      docRef,
      {
        [filename]: AES,
      },
      { merge: true }
    );
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      setStatus("Select a file to upload");
      return;
    }

    const fileName = selectedFile.name;
    const email = user.email;

    setStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", selectedFile, fileName);

    try {
      const response = await axios.post(`/api/upload?user=${email}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
       if (response.data.status === "success") {
        setFileAes(`Your AES is ${response.data.aes}.`);
        setStatus(`Uploading AES to firestore now...`);
        // Store DEK in Firestore
        await storeDEKInFirebase(
          `${response.data.uuid}-${fileName}`,
          response.data.aes,
          email
        );
        setStatus("AES uploaded to Firestore successfully.");
      } else {
        throw new Error(response.data.status);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus(error.message);
    }
  };
      
      return (
        <div>
      <h2>File Upload</h2>

      {/* isLoading ? (
        <p>Loading user data...</p>
        ) :  */}

      {user ? (
          <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          <div>Status: {status}</div>
          <div>AES: {fileAes}</div>
        </div>
      ) : (
        <div>You must be logged in to upload a file.</div>
        )}
    </div>
  );
};

export default UploadFile;

