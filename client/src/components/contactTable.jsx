import React from "react";
import { ContactRow } from ".";
import { useContact } from "../context/contactContext/contactState";

const ContactTable = () => {
  const { deleteContact, contacts } = useContact();

  return (
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
              {contacts?.map((contact, index) => (
                <ContactRow
                  key={index}
                  contactName={contact.name}
                  contactPhone={contact.phone}
                  contactEmail={contact.email}
                  contactRole={contact.relationship}
                  deleteHandler={() => deleteContact(contact.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ContactTable;
