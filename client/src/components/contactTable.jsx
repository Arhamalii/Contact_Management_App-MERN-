import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import noFound from "../assets/no_found.png";
import { useAuth } from "../context/auth";
import { useContact } from "../context/contactContext/state";
import { btn } from "../utils/constant";
import { ContactRow } from "./";

const ContactTable = () => {
  const [auth] = useAuth();
  const [isDelay, setisDelay] = useState(true);
  const [globalContacts, setGlobalContacts] = useState(null);
  const [active, setActive] = useState({
    professional: false,
    personal: false,
    all: true,
  });
  const {
    setContacts,
    contacts,
    updateConatctSetter,
    deleteConatact,
    filterPersonal,
    filterProfessional,
  } = useContact();

  // checking filters from lcoalStorage for display on ui  and prevent delay if filter set to all
  useEffect(() => {
    const filter = localStorage.getItem("filter");
    switch (filter) {
      case "professional":
        setActive({ professional: true });
        setTimeout(() => {
          setisDelay(false);
        }, 1000);
        break;
      case "personal":
        setActive({ personal: true });
        setTimeout(() => {
          setisDelay(false);
        }, 1000);

        break;
      default:
        setTimeout(() => {
          setisDelay(false);
        }, 0);
        break;
    }
    setGlobalContacts(contacts);
    // for setting contacts
  }, [contacts]);

  useEffect(() => {
    if (auth.token) {
      setContacts();
      const prevFilter = localStorage.getItem("filter");
      if (!prevFilter) {
        localStorage.setItem("filter", "all");
      }
      prevFilter === "personal" && filterPersonal();
      prevFilter === "professional" && filterProfessional();
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
  // search funstionality
  const [searchValue, setSearchValue] = useState("");
  const searchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.length === 0) {
      setGlobalContacts(contacts);
    }
  };
  const searchHandler = (e) => {
    e.preventDefault();
    const filteredContacts = contacts.filter((contact) =>
      contact?.name?.toLowerCase().includes(searchValue?.toLowerCase())
    );
    setGlobalContacts(filteredContacts);
  };

  return (
    <div className="overflow-x-auto">
      <section className="container mx-auto font-mono min-w-[600px] ">
        <div className="w-full mb-8  rounded-lg shadow-lg max-h-[77vh] overflow-y-scroll">
          <div class="md:flex md:items-center md:justify-between mb-3  ">
            <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse">
              {btn.map((btn) => (
                <button
                  class={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200  sm:text-sm ${
                    active[btn.btnValue] && "bg-gray-100"
                  }`}
                  onClick={() => {
                    btn.btnValue === "personal"
                      ? filterPersonal()
                      : btn.btnValue === "professional"
                      ? filterProfessional()
                      : setContacts(false, true),
                      setActive({ [btn.btnValue]: true });
                  }}
                >
                  {btn.btnText}
                </button>
              ))}
              <CSVLink data={contacts} filename={"contacts.csv"}>
                <button class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm">
                  Export to CSV
                </button>
              </CSVLink>
            </div>

            <form
              class="relative flex items-center mt-4 md:mt-0 max-w-[341px]"
              onSubmit={searchHandler}
            >
              <input
                type="text"
                placeholder="Search..."
                class="block w-full py-1.5 pr-5 text-gray-700  bg-white border border-slate-300 rounded-lg md:w-80 md:mr-[3px] placeholder-gray-400/70 pl-4 rtl:pr-11 rtl:pl-5  focus:border-none outline-1 outline-slate-300"
                value={searchValue}
                onChange={searchValueChangeHandler}
              />

              <button
                class="absolute right-0.5 bg-slate-300 py-[0.55rem] rounded-r-md"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </form>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Contact Number</th>
                  <th className="px-4 py-3">Relation</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {globalContacts?.length === 0 ? (
                  <div className="text-center p-8 absolute inset-0 flex flex-col items-center justify-center">
                    <div>
                      <img
                        src={noFound}
                        alt="No Result Found"
                        className="max-w-full h-auto"
                      />
                    </div>
                    <h1 className="text-gray-500 text-lg mt-4">
                      No Contacts Found
                    </h1>
                  </div>
                ) : (
                  !isDelay &&
                  globalContacts?.map((contact, index) => (
                    <ContactRow
                      key={index}
                      contactName={contact.name}
                      contactPhone={contact.phone}
                      contactEmail={contact.email}
                      contactRole={contact.relation}
                      deleteHandler={() => deleteConfirmHandler(contact._id)}
                      editHandler={() => updateConatctSetter(contact._id)}
                    />
                  ))
                )}
              </tbody>
            </table>
            {/* <NewTable /> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactTable;
