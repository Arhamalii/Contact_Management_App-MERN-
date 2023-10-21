import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default App;
