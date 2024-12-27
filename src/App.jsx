import React from "react";
import Landingpage from "./components/landingpage";
import Addtojob  from "./Company/addtojob";
import CompanyDashboard from "./Company/Companydashboard";
import UserRegistrationForm from "./User/UserRegistration";
import UserLoginPage from "./User/Userlogin";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import CompanyloginPage from "./Company/Companylogin";
import CompanyRegistrationPage from "./Company/Companyregistration";
import Userdashboard from "./User/Userdashboard";
import Userprofile from "./User/Userprofile";
import Companyprofile from "./Company/Companyprofile";
import Userlistedjobs from "./User/Userlistedjobs";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/*" element={<Landingpage/>}/>
        <Route path="/Companylogin" element={<CompanyloginPage />} />
        <Route path="/Companyregistration" element={<CompanyRegistrationPage />} />
        <Route path="/Companydashboard" element={<CompanyDashboard />} />
        <Route path="/Companyprofile" element={<Companyprofile/>}/>
        <Route path="/Addtojob" element={<Addtojob />} />
        <Route path="/Userlogin" element={<UserLoginPage />} />
        <Route path="/Userregistration" element={<UserRegistrationForm />}/>
        <Route path="/Userdashboard" element={<Userdashboard />}/>
        <Route path="/Userprofile" element={<Userprofile />}/>
        <Route path="/userlistedjobs/:category" element={<Userlistedjobs />} />

    </Routes>
    </BrowserRouter>
    
  );
};

export default App;
