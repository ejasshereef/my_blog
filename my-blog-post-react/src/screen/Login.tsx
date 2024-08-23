import React, { useState } from "react";
import { Link } from "react-router-dom";

interface tsFormData{
    user_name:string;
    password:string
}

const Login = () => {
  // setState
  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
  } as tsFormData);

  const [formError, setFormError] = useState({
    user_name: "",
    password: "",
  } as tsFormData);

  // Password Visible
  const [isPasswordVisible, setIsPasswordvisible] = useState(false);

  const [requestAdd, setRequestAdd] = useState({
    loading: false,
    error: "",
    success: "",
  });

  // Validation Form
  const validateLoginForm = async () => {
    try {
      let hasError = false;
      const tempError = {
        user_name: "",
        password: "",
       
      };

      tempError.user_name = "";
      if (formData.user_name.length === 0) {
        hasError = true;
        tempError.user_name = "required";
      }

      if (formData.user_name.length >= 60) {
        hasError = true;
        tempError.user_name = "Only allow 60 characters.";
      }

      tempError.password = "";
      if (formData.password.length === 0) {
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

  return (
    <>
      <div className="md:mx-8 bg-red-200 px-3 lg:mx-28  lg:px-0 md:p-0">
        <div className="container mx-auto">
          <div className="w-full md:flex-row xs:flex-col">
            <div className="md:mx-40 lg:mx-64 bg-orange-300 xl:mx-96">
              <div className="rounded border">
                <div className="bg-gray-100 p-3 border-b text-center">
                  Login
                </div>

                {/* {Field User name} */}
                <>
                  <div>
                    <div className="flex justify-between p-3">
                      <label className="text-sm">User name or Email id</label>
                    </div>
                    <div className="px-3">
                      <input
                        maxLength={60}
                        placeholder="Enter User Name or Email ID"
                        className="w-full border-2  p-2 rounded  outline-none  border-gray-100 focus:border-gray-200"
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
                          //   type={isPasswordVisible ? "text" : "password"}
                          placeholder="Enter Password"
                        />
                      </div>
                    </div>
                  </div>
                </>

                {/* Submit Login button */}
                <div className="p-3">
                  <div className="flex justify-center">
                    <button className="bg-gray-200 hover:bg-gray-100 rounded text-sm px-10 py-2.5 text-center inline-flex text-black">
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
      </div>
    </>
  );
};

export default Login;
