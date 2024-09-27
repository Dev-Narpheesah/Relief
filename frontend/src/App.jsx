// App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";


import Home from "./Component/Home/Home";
import SignIn from "./Component/SignIn/SignIn";
import Register from './Component/Register/Register';
import HeroSection from "./Component/Home/HeroSection";
import Service from "./Component/Services/Service";
import About from "./Component/About/About";
import Contact from "./Component/Contact/Contact";
import SideBar from "./Component/Sidebar/SideBar";
import UpdateProfile from "./Component/UserDashboard/UpdateProfile";
import UserDashboard from "./Component/UserDashboard/UserDashboard";
import AdminDashboard from "./Component/AdminDashboard/AdminDashboard";
import UserManagement from "./Component/AdminDashboard/UserManagement";
import ResourceManagement from "./Component/AdminDashboard/ResourceManagement";
import Reports from "./Component/AdminDashboard/Reports";
import AdminLog from "./Component/AdminDashboard/AdminLog";
import AdminReg from "./Component/AdminDashboard/AdminReg";
import DisasterCard from "./Component/DisasterCard/DisasterCard";
import DisasterForm from "./Component/DisasterForm/DisasterForm";
import HelpForm from "./Component/Help/HelpForm";
import DisasterReport from "./Component/DisasterCard/DisasterReport";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/hero" element={<HeroSection />} />
      <Route path="/service" element={<Service />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/sidebar" element={<SideBar />} />
      <Route path="/update" element={<UpdateProfile />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin-log" element={<AdminLog />} />
      <Route path="/adminReg" element={<AdminReg />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/resource" element={<ResourceManagement />} />
      <Route path="/report" element={<Reports />} />
      <Route path="/card" element={<DisasterCard />} />
      <Route path="/disReport" element={<DisasterReport/>} />
      <Route path="/disForm" element={<DisasterForm />} />
      <Route path="/help" element={<HelpForm />} />
    </Routes>
  );
}

export default App;
