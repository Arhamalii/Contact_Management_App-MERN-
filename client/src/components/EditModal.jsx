import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useContact } from "../context/contactContext/state";
import { createContactValidation } from "../utils/Schema";
import { inputData } from "../utils/constant";

const Modal = () => {
  const [open, setOpen] = useState(false);
  const { updateContactState, updateCoantact, updateCoantactRemover } =
    useContact();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        phone: "",
        email: "",
        relation: "",
      },
      validationSchema: createContactValidation,
      onSubmit: async (values, action) => {
        console.log(values);
        const success = await updateCoantact(values, updateContactState._id);
        if (success) {
          setOpen(false);
          action.resetForm();
        }
      },
    });
  const modalCloseHandler = () => {
    setOpen(false);
    updateCoantactRemover();
  };

  useEffect(() => {
    updateContactState && setOpen(true);
  }, [updateContactState]);

  useEffect(() => {
    if (updateContactState) {
      // Set form values here once the data is available
      values.name = updateContactState.name || "";
      values.phone = updateContactState.phone || "";
      values.email = updateContactState.email || "";
      values.relation = updateContactState.relation || "";
    }
  }, [updateContactState]);
  return (
    <>
      <div
        className={` ${
          open ? "block" : "hidden"
        }  absolute top-0 w-full h-full z-10 bg_modal`}
      >
        <div
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center  "
        >
          <div className="relative w-full max-w-md max-h-full shadow-xl ">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={modalCloseHandler}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Edit Contact
                </h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {inputData.map((inp) => {
                    return (
                      <div>
                        <label
                          htmlFor={inp.name}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {inp.name.charAt(0).toUpperCase() + inp.name.slice(1)}
                        </label>
                        <input
                          name={inp.name}
                          type={inp.type}
                          value={values[inp.name]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          // placeholder="name@company.com"
                        />
                        {touched[inp.name] && errors[inp.name] ? (
                          <small className="text-red-600">
                            {errors[inp.name]}
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}

                  <div>
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Contact Relation
                    </label>
                    <select
                      name={"relation"}
                      value={values.relation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mt-[0px]"
                    >
                      <option value="personal">Personal</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-slate-600 hover:bg-hoverSecondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cente"
                    onSubmit={handleSubmit}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
