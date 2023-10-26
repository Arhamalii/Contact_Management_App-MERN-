import React from "react";
import { AddIcon, Charts, ContactTable, Navbar } from "../components";
const Home = () => {
  return (
    <div>
      <Navbar />
      <AddIcon />
      <div className="w-full  px-4 sm:px-12 py-2">
        <ContactTable />
        <Charts />
      </div>
    </div>
  );
};

export default Home;
