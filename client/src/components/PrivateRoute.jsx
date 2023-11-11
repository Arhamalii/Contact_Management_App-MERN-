import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Login } from "../pages";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    if (auth?.token) {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [auth.token]);

  return ok ? <Outlet /> : <Login />;
};

export default PrivateRoute;
