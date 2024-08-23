import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EnvKeys from "../utils/EnvKeys";
import isEmail from "validator/lib/isEmail";
import { isMobilePhone } from "validator";
import axios from "../utils/AxiosInstance";

interface tsFormData {
  name: string;
  password: string;
  mobile: number;
  email: string;
}

interface tsFormError {
  name: string;
  password: string;
  mobile: string;
  email: string;
}

const Register = () => {
  const navigate = useNavigate();

  // setState
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    mobile: 0,
    email: "",
  } as tsFormData);

  const [formError, setFormError] = useState({
    name: "",
    password: "",
    mobile: "",
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
        mobile: "",
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

      tempError.mobile = "";
      if (formData?.mobile.toString().length < 10) {
        hasError = true;
        tempError.mobile = "invalid mobile no";
      }

      if (isMobilePhone(formData?.mobile.toString())) {
      } else {
        hasError = true;
        tempError.mobile = "invalid mobile no";
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

      const response = await axios.post("/register", formData);
      if (response.status === 200) {
        setRequest({
          loading: false,
          error: "",
          success: "Succesfully Registered...!",
        });
        navigate("/home");
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
    }
  };

  return (
    <>
      <section className="md:mx-8 px-3 lg:mx-28  lg:px-0 md:p-0">
        <div className="container mx-auto">
          <div className="w-full md:flex-row xs:flex-col">
            <div className="md:mx-40 lg:mx-64 xl:mx-96 md:mt-52">
              <div className="rounded border">
                <div className="bg-gray-100 p-3 border-b text-center">
                  Register
                </div>

                {/* {User name Field} */}
                <>
                  <div>
                    <div className="flex justify-between p-3">
                      <label className="text-sm">User name</label>
                    </div>
                    <div className="px-3">
                      <input
                        maxLength={60}
                        placeholder="Enter User Name"
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
                      <label className="text-sm">Email id</label>
                    </div>
                    <div className="px-3">
                      <input
                        maxLength={60}
                        placeholder="Enter Email ID"
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
                      <label className="text-sm">Mobile No</label>
                    </div>
                    <div className="px-3">
                      <input
                        maxLength={10}
                        type="tel"
                        value={formData?.mobile === 0 ? "" : formData?.mobile}
                        placeholder="Enter Mobile no"
                        className="w-full border-2  p-2 rounded  outline-none  border-gray-100 focus:border-gray-200"
                        onChange={(e) => {
                          const tempVal = e.target.value;
                          if (/^\d*$/.test(tempVal)) {
                            setFormData({
                              ...formData,
                              mobile: +tempVal,
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
                      <div></div>
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
                      onClick={()=>handleSubmition()}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
