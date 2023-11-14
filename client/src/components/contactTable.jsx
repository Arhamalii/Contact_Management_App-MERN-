import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../context/auth";
import { useContact } from "../context/contactContext/state";
import { ContactRow } from "./";

const ContactTable = () => {
  const [auth] = useAuth();
  const { setContacts, contacts, updateConatctSetter, deleteConatact } =
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
    <div className="overflow-x-auto">
      <section className="container mx-auto font-mono min-w-[600px] ">
        {/* <div className="w-full py-2 px-2 rounded-xl flex justify-between items-center bg-[#F3F4F6]">
          <div className="flex items-center">
            <input
              name="search"
              type="text"
              placeholder="Search here"
              className="border-2 border-secondary rounded-md py-1 px-2 focus:outline-none focus:border-primary transition duration-300"
            />
          </div>
          <select
            name="roleFilter"
            id="roleFilter"
            className="border-2 border-secondary rounded-md py-1 px-2 focus:outline-none focus:border-primary transition duration-300 bg-white text-gray-800"
          >
            <option value="">All Roles</option>
            <option value="role1">Role 1</option>
            <option value="role2">Role 2</option>
          </select>
        </div> */}
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
                    editHandler={() => updateConatctSetter(contact._id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactTable;
