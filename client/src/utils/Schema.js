import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter Valid Email")
    .required("Please Enter Your Email"),
  password: yup.string().required("Please Enter your Password "),
});
