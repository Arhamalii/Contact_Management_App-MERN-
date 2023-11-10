import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter Valid Email")
    .required("Please Enter Your Email"),
  password: yup.string().required("Please Enter your Password "),
});

export const registerSchema = yup.object({
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .email("Enter Valid Email")
    .required("Please Enter Your Email"),
  password: yup.string().min(6).max(20).required("Please Enter your Password "),
});

export const createContactValidation = yup.object({
  name: yup.string().required("Contact Name is Required"),
  phone: yup.number().required("Contact Number is Required"),
});
