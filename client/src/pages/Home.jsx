import React, { useState } from "react";
import { AddIcon, Charts, ContactTable, Modal, Navbar } from "../components";
const Home = () => {
  const [open, setOpen] = useState(false);
  const modalHandler = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Navbar />
      <AddIcon click={modalHandler} />
      <Modal open={open} setOpen={setOpen} />
      <div className="w-full  px-4 sm:px-12 py-2">
        <ContactTable />
        <Charts />
      </div>
    </div>
  );
};

export default Home;
