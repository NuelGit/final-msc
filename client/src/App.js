import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import {AuthContextProvider } from "./hooks/UserContext";
import NotFound from "./pages/NotFound";
import CreateAccount from "./pages/CreateAccount";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import UploadFile from "./files/UploadFile";
import DownloadFile from "./files/DownloadFile.js";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
    <BrowserRouter>  
    <AuthContextProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/create-user" element={<CreateAccount />} />

          <Route path='/profile' element ={<ProtectedRoute><Profile/> </ProtectedRoute>} />
        <Route path='/uploads' element ={<ProtectedRoute><UploadFile/> </ProtectedRoute>} />
        <Route path='/view-files' element ={<ProtectedRoute><DownloadFile/> </ProtectedRoute>} />
        </Routes>
    </AuthContextProvider>
    </BrowserRouter>
      </div>
  );
}


export default App;
