import React from "react";
import Landingpage from "./components/landingpage";
import Addtojob  from "./Company/addtojob";
import CompanyDashboard from "./Company/Companydashboard";
import UserRegistrationForm from "./User/Userregistration";
import UserLoginPage from "./User/Userlogin";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import CompanyloginPage from "./Company/Companylogin";
import CompanyRegistrationPage from "./Company/Companyregistration";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/*" element={<Landingpage/>}/>
        <Route path="/Companylogin" element={<CompanyloginPage />} />
        <Route path="/Companyregistration" element={<CompanyRegistrationPage />} />
        <Route path="/Userlogin" element={<UserLoginPage />} />
        <Route path="/Userregistration" element={<UserRegistrationForm />}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
