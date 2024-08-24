import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 5000);
  }, []);
  return (
    <>
      <div className="max-w-3xl mx-auto p-4 mt-96">
        <h1 onClick={() => navigate("/login")} className="text-center text-4xl">
          Welcome to My Blog Post
        </h1>
      </div>
    </>
  );
};

export default Loading;
