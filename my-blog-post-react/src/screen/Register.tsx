import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EnvKeys from "../utils/EnvKeys";
import isEmail from "validator/lib/isEmail";
import { isMobilePhone } from "validator";
import axiosInstance from "../utils/AxiosInstance";
import axios, { isAxiosError } from "axios";

interface tsFormData {
  name: string;
  password: string;
  phone: number;
  email: string;
}

interface tsFormError {
  name: string;
  password: string;
  phone: string;
  email: string;
}

const Register = () => {
  const navigate = useNavigate();

  // setState
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    phone: 0,
    email: "",
  } as tsFormData);

  const [formError, setFormError] = useState({
    name: "",
    password: "",
    phone: "",
    email: "",
  } as tsFormError);

  // Password Visible
  const [isPasswordVisible, setIsPasswordvisible] = useState(false);

  const [request, setRequest] = useState({
    loading: false,
    error: "",
    success: "",
  });

  // Validation Form
  const validate = async () => {
    try {
      let hasError = false;
      const tempError = {
        name: "",
        password: "",
        email: "",
        phone: "",
      };

      tempError.name = "";
      if (formData.name.length === 0) {
        hasError = true;
        tempError.name = "required";
      }

      if (formData.name.length >= 60) {
        hasError = true;
        tempError.name = "Only allow 60 characters.";
      }

      tempError.password = "";
      if (formData.password.length === 0) {
        hasError = true;
        tempError.password = "required";
      }

      tempError.email = "";
      if (isEmail(formData?.email)) {
      } else {
        hasError = true;
        tempError.email = "Invalid email id";
      }

      tempError.phone = "";
      if (formData?.phone.toString().length < 10) {
        hasError = true;
        tempError.phone = "invalid mobile no";
      }

      if (isMobilePhone(formData?.phone.toString())) {
      } else {
        hasError = true;
        tempError.phone = "invalid mobile no";
      }

      setFormError({
        ...formError,
        ...tempError,
      });

      if (hasError) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmition = async () => {
    try {
      setRequest({
        loading: true,
        error: "",
        success: "",
      });
      const hasError = await validate();
      if (hasError) {
        setRequest({
          loading: false,
          error: "Enteries are not Valid...!",
          success: "",
        });
        return;
      }

      const response = await axiosInstance.post("/register", formData);
      if (response.status === 200) {
        setRequest({
          loading: false,
          error: "",
          success: "Succesfully Registered...!",
        });
        navigate("/posts");
      } else {
        setRequest({
          loading: false,
          error: "Invalid Credentials...!",
          success: "",
        });
      }
    } catch (error) {
      setRequest({
        loading: false,
        error: "Unexpected Error...!",
        success: "",
      });
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(error?.response?.data?.message);

          console.error(
            `Error ${error.response.status}:`,
            error.response.data.message
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <>
      <div className="md:mx-8 px-3 lg:mx-28  lg:px-0 md:p-0">
        <div className="container mx-auto">
          <div className="md:mx-40 lg:mx-64 xl:mx-[500px] md:mt-52">
            <div className="rounded border">
              <div className="bg-gray-100 p-3 border-b text-center">
                Register
              </div>

              {/* {User name Field} */}
              <>
                <div>
                  <div className="flex justify-between p-3">
                    <label className="text-sm">Name</label>
                    {formError?.name?.length > 0 && (
                      <label className="text-sm text-red-500">
                        {formError?.name}
                      </label>
                    )}
                  </div>
                  <div className="px-3">
                    <input
                      maxLength={60}
                      placeholder="Enter Name"
                      className="w-full border-2  p-2 rounded  outline-none  border-gray-100 focus:border-gray-200"
                      onChange={(e) => {
                        const tempVal = e.target.value;
                        if (tempVal) {
                          setFormData({
                            ...formData,
                            name: tempVal?.trim(),
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </>
              {/* {Email Field} */}

              <>
                <div>
                  <div className="flex justify-between p-3">
                    <label className="text-sm">Email Id</label>
                    {formError?.email?.length > 0 && (
                      <label className="text-sm text-red-500">
                        {formError?.email}
                      </label>
                    )}
                  </div>
                  <div className="px-3">
                    <input
                      maxLength={60}
                      placeholder="Enter Email Id"
                      className="w-full border-2  p-2 rounded  outline-none  border-gray-100 focus:border-gray-200"
                      onChange={(e) => {
                        const tempVal = e.target.value;
                        if (tempVal) {
                          setFormData({
                            ...formData,
                            email: tempVal?.trim(),
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </>

              {/* {Phone Field} */}

              <>
                <div>
                  <div className="flex justify-between p-3">
                    <label className="text-sm">Phone No</label>
                    {formError?.phone?.length > 0 && (
                      <label className="text-sm text-red-500">
                        {formError?.phone}
                      </label>
                    )}
                  </div>
                  <div className="px-3">
                    <input
                      maxLength={10}
                      type="tel"
                      value={formData?.phone === 0 ? "" : formData?.phone}
                      placeholder="Enter Phone No"
                      className="w-full border-2  p-2 rounded  outline-none  border-gray-100 focus:border-gray-200"
                      onChange={(e) => {
                        const tempVal = e.target.value;
                        if (/^\d*$/.test(tempVal)) {
                          setFormData({
                            ...formData,
                            phone: +tempVal,
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </>

              {/* Field Password */}
              <>
                <div>
                  <div className="flex justify-between p-3">
                    <label>Password</label>
                    {formError?.password?.length > 0 && (
                      <label className="text-sm text-red-500">
                        {formError?.password}
                      </label>
                    )}
                  </div>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 right-0 flex items-center px-3">
                      <button className=""></button>
                    </div>
                    <div className="px-3">
                      <input
                        className="w-full border-2 rounded p-2 outline-none border-gray-100 focus:border-gray-200"
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => {
                          const tempVal = e.target.value;
                          if (tempVal) {
                            setFormData({
                              ...formData,
                              password: tempVal?.trim(),
                            });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>

              {/* Submit Login button */}
              <div className="p-3">
                <div className="flex justify-center">
                  <button
                    className="bg-gray-200 hover:bg-gray-100 rounded text-sm px-10 py-2.5 text-center inline-flex text-black"
                    onClick={() => handleSubmition()}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center text-blue-500  mt-10">

             <Link  to={'/login'}>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
