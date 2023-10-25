import React, { useEffect, useState } from "react";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import {UserAuth} from  '../hooks/UserContext'

const ViewFiles = () => {
  // Define state variables
  const { user } = UserAuth();
  const [filesData, setFilesData] = useState([]);

  // Function to trigger file download
  const triggerDownload = async (fileKey) => {
    let myAES = '';
      myAES = prompt("Enter your AES");

      if(!myAES){
        alert(" AES can not be empty")
        return

      } else if(myAES.length !==64){
        alert('AES must Be 64 Characters')
        return
      }

    const [user, fileName] = fileKey.split("/");

    const retrieveDEKfromFirebase = async (fileName, email) => {
      const docRef = doc(db, "users", email);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data()[fileName];
      } else {
        console.error("No AES found for file:", fileName);
        return null;
      }
    };

    const AES = await retrieveDEKfromFirebase(fileName, user);

    if (myAES !== AES) {
      alert("Incorrect AES");
      return;
    }

    try {
      const response = await axios.get(
        `/api/download?key=${fileKey}&aes=${AES}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileKey.split("/")[1]);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch files data
  useEffect(() => {
    if (!user) {
      return;
    }
    axios
      .get(`api/files?user=${user.email}`)
      .then((response) => {
        setFilesData(response.data.files);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  return (

    // isLoading ? (
    //   <p>Loading user data...</p>
    // ) :

    <div>
      <h2>View Files</h2>
      { user ? (
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Date</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filesData.map((file, index) => {
              return (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{new Date(file.LastModified).toLocaleString()}</td>
                  <td>{file.Size} bytes</td>
                  <td>
                    <button onClick={() => triggerDownload(file.Key)}>
                      Download
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>You must be logged in to upload a file.</div>
      )}
    </div>
  );
};

export default ViewFiles;
