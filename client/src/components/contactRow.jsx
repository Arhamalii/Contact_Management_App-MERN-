import React from "react";
import Avatar from "react-avatar";
import { color } from "../utils/constant";

const contactRow = ({
  contactName,
  contactEmail,
  contactPhone,
  contactRole,
  editHandler,
  deleteHandler,
  isProfessional,
}) => {
  return (
    <tr className="text-gray-700">
      <td className="px-4 py-3 border">
        <div className="flex items-center text-sm">
          <div className="relative w-8 h-8 mr-3 rounded-full md:block">
            <Avatar
              name={contactName.charAt(0)}
              size="34"
              round={true}
              color={color()}
            />
            <div
              className="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div>
          <div>
            <p className="font-semibold text-black">{contactName}</p>
            <p className="text-xs text-gray-600">{contactEmail}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-ms font-semibold border">{contactPhone}</td>
      <td className="px-4 py-3 text-xs border">
        <span
          className={`px-2 py-1 font-semibold leading-tight rounded-sm ${
            contactRole !== "professional"
              ? "text-green-700 bg-green-100"
              : "text-sky-600 bg-gray-100"
          } `}
        >
          {contactRole}
        </span>
      </td>
      <td className="px-4 py-3 text-sm border">
        <button className="mr-6" onClick={editHandler}>
          Edit
        </button>
        <button onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
};

export default contactRow;
