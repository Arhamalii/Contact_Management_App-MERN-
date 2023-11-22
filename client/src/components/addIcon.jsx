import React from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
const AddIcon = ({ click }) => {
  return (
    <div
      className="w-16 h-16 max-sm:w-12 max-sm:h-12  shadow-3xl rounded-full absolute bottom-6 right-6 flex items-center justify-center cursor-pointer z-50 bg-white "
      onClick={click}
    >
      <BsFillPersonPlusFill className="text-secondary text-3xl max-sm:text-2xl" />
    </div>
  );
};

export default AddIcon;
