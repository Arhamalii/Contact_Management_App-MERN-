import React from "react";
import { Charts, ContactList } from "../components";
const Home = () => {
  return (
    <div className="grid gap-7 px-4 h-screen w-full sm:px-12 md:grid-cols-2">
      <ContactList />
      <Charts />
    </div>
  );
};

export default Home;
