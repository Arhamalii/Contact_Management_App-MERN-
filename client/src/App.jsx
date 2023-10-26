import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { Modal, Navbar } from "./components";
import { Home, Login, Register } from "./pages";
const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/nav" element={<Navbar />}></Route>
        <Route path="/modal" element={<Modal />}></Route>
      </Routes>
    </>
  );
};

export default App;
