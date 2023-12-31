import React, { useState } from "react";
import { AddIcon, ContactTable, EditModal, Modal, Navbar } from "../components";
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
      <EditModal open={open} setOpen={setOpen} />
      <div className="w-full  px-4 sm:px-12 pt-8  sm:pt-12">
        <ContactTable />
      </div>
    </div>
  );
};

export default Home;
