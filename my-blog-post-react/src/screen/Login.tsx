import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import axios from "../utils/AxiosInstance";


interface tsFormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  // setState
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  } as tsFormData);

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  } as tsFormData);

  // Password Visible
  const [isPasswordVisible, setIsPasswordvisible] = useState(false);

  const [request, setRequest] = useState({
    loading: false,
    error: "",
    success: "",
  });

  // Form Validation
  const validate = async () => {
    try {
      let hasError = false;
      const tempError = {
        email: "",
        password: "",
      };

      tempError.email = "";

      if (formData?.email?.length === 0) {
        hasError = true;
        tempError.email = "required";
      }

      if (isEmail(formData?.email)) {
        // valid email Id //
      } else {
        hasError = true;
        tempError.email = "Enter a Valid Email Id.";
      }

      if (formData?.email?.length >= 60) {
        hasError = true;
        tempError.email = "Only allow 60 characters.";
      }

      tempError.password = "";
      if (formData?.password?.length === 0) {
        hasError = true;
        tempError.password = "required";
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

      const response = await axios.post("/login", formData);
      if (response.status === 200) {
        setRequest({
          loading: false,
          error: "",
          success: "Login Success...!",
        });
        alert(response?.data?.message)
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
     
      <div className="md:mx-8 px-3 lg:mx-28  lg:px-0 md:p-0">
        <div className="container mx-auto">
          <div className="md:mx-40 lg:mx-64  xl:mx-[500px] md:mt-52">
            <div className="rounded border">
              <div className="bg-gray-100 p-3 border-b text-center">Login</div>

              {/* {Field User name} */}
              <>
                <div>
                  <div className="flex justify-between p-3">
                    <label className="text-sm">User name or Email id</label>
                    {formError?.email?.length > 0 && (
                      <label className="text-sm text-red-500">
                        {formError?.email}
                      </label>
                    )}
                  </div>
                  <div></div>
                  <div className="px-3">
                    <input
                      maxLength={60}
                      placeholder="Enter User Name or Email ID"
                      className="w-full border-2  p-2 rounded  outline-none  border-gray-100 focus:border-gray-200"
                      onChange={(e) => {
                        const temVal = e.target.value;
                        if (temVal)
                          setFormData({
                            ...formData,
                            email: temVal.trim(),
                          });
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
                              password: tempVal.trim(),
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
                    Login
                  </button>
                </div>

                {/* ------------------- */}

                <Link to={"/register"}>
                  <p className="text-blue-500  hover:text-blue-600 cursor-pointer text-center my-2">
                    New Register
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
