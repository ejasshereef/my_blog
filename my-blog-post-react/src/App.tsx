import React from "react";
import Login from "./screen/Login";
import {
  createBrowserRouter,
  Routes,
  Route,
  Router,
  BrowserRouter,
} from "react-router-dom";
import Home from "./screen/Home";
import Register from "./screen/Register";
import Detail from "./screen/Detail";


function App() {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
