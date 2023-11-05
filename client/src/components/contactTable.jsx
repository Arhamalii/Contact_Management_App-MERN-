import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { ContactRow, EditModal } from "./";
const ContactTable = () => {
  const [contact, setcontact] = useState(null);
  const [auth] = useAuth();

  const getAllContacts = async () => {
    const res = await axios.get("/api/contacts");
    // if (res.data.success) {
    console.log(res.data);
    setcontact(res.data.allContacts);
    // }
  };

  useEffect(() => {
    if (auth.token) {
      getAllContacts();
    }
  }, [auth.token]);

  const [editModal, setEditModal] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const editHandler = (contact) => {
    setEditContact(contact);
  };
  return (
    <>
      <section className="container mx-auto p-6 font-mono ">
        <div className="w-full mb-8  rounded-lg shadow-lg max-h-[47vh] overflow-y-scroll">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone Number</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {contact?.map((contact, index) => (
                  <ContactRow
                    key={index}
                    contactName={contact.name}
                    contactPhone={contact.phone}
                    contactEmail={contact.email}
                    contactRole={contact.relationship}
                    deleteHandler={() => deleteContact(contact.id)}
                    // editHandler={() => updateContact(contact.id) }
                    editHandler={() => editHandler(contact)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <EditModal
        open={editModal}
        setOpen={setEditModal}
        contact={setEditContact}
      />
    </>
  );
};

export default ContactTable;
