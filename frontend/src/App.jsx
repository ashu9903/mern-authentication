import React, { useState } from "react";
import { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgatePassword from "./pages/ForgatePassword";
import Navbar from "./component/Navbar";
import Dashbord from "./pages/admin/Dashbord";
import Acoount from "./pages/client/Acoount";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Protected from "./pages/Protected";
import Register from "./pages/Register";
import { ResetPassword } from "./pages/ResetPassword";
export const AuthContext = createContext();

const App = () => {
  const localData = localStorage.getItem("login")
    ? JSON.parse(localStorage.getItem("login"))
    : null;
  const [authData, setauthData] = useState({ login: localData });
  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider value={{ authData, setauthData }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/dashboard" element={<Dashbord />} />
            <Route path="/forget-password" element={<ForgatePassword />} />
            <Route path="/reset-password/:id" element={<ResetPassword />} />
            <Route
              path="/client/account"
              element={<Protected element={<Acoount />} />}
            />
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
