import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../context/auth";
import { useContact } from "../context/contactContext/state";
import { ContactRow } from "./";
const ContactTable = () => {
  const [auth] = useAuth();
  const { setContacts, contacts, updateIdSetter, deleteConatact } =
    useContact();

  useEffect(() => {
    if (auth.token) {
      setContacts();
    }
  }, [auth.token]);

  // delete confirm
  const deleteConfirmHandler = (id) => {
    Swal.fire({
      title: "Are you sure to delete it?",
      icon: "error",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#384152",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteConatact(id);
        Swal.fire({
          title: "Deleted!",
          text: "Contact has been deleted.",
          icon: "success",
          confirmButtonColor: "#384152",
        });
      } else if (result.isDenied) {
        Swal.fire("Deactivation Cancelled!!", "", "error");
      }
    });
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
                {contacts?.map((contact, index) => (
                  <ContactRow
                    key={index}
                    contactName={contact.name}
                    contactPhone={contact.phone}
                    contactEmail={contact.email}
                    contactRole={contact.relation}
                    deleteHandler={() => deleteConfirmHandler(contact._id)}
                    editHandler={() => updateIdSetter(contact._id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactTable;
