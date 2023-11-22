import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/auth";
import { loginSchema } from "../../utils/Schema";
import { loginInitialValues } from "../../utils/constant";
const Login = () => {
  const [auth, setAuth] = useAuth();
  const Navigate = useNavigate();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: loginInitialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        try {
          const res = await axios.post("/api/auth/login", {
            email: values.email,
            password: values.password,
          });
          if (res.status === 200) {
            toast.success(res.data.message);
            setAuth({ ...auth, user: res.data.users, token: res.data.token });
            localStorage.setItem(
              "auth",
              JSON.stringify({ token: res.data.token, users: res.data.users })
            );
            Navigate("/");
            action.resetForm();
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
    });

  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <img src={logo} alt="logo" className="w-48 mx-auto mb-8" />

          <form
            className="mx-auto max-w-lg rounded-lg border"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4 p-4 md:p-8 ">
              <div>
                <label htmlFor="email" className="label_field">
                  Email
                </label>
                <input
                  name="email"
                  className="input_style"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email ? (
                  <small className="text-red-600">{errors.email}</small>
                ) : (
                  ""
                )}
              </div>

              <div>
                <label htmlFor="password" className="label_field">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="input_style"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password ? (
                  <small className="text-red-600">{errors.password}</small>
                ) : (
                  ""
                )}
              </div>

              <button
                className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
                type="submit"
              >
                Log in
              </button>

              <div className="relative flex items-center justify-center">
                <span className="absolute inset-x-0 h-px bg-gray-300"></span>
                <span className="relative bg-white px-4 text-sm text-gray-400">
                  OR
                </span>
              </div>

              <button
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold text-secondary outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base"
                onClick={() => Navigate("/register")}
              >
                Register Now
              </button>
            </div>

            <div className="flex items-center justify-center bg-gray-100 p-4">
              <p className="text-center text-sm text-gray-500">
                Forgot Password ?{" "}
                <a
                  href="#"
                  className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                >
                  Forgot Now
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
