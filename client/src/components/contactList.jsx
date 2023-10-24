import React from "react";
import { useAuth } from "../context/auth";
const ContactList = () => {
  const [auth, setAuth] = useAuth();
  console.log(auth);
  return <div className="bg-slate-600 h-full">{auth.token}</div>;
};

export default ContactList;
