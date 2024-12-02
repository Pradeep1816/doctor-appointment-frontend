'use client'
import React, { useState } from "react";
import Sidebar from "@/app/(unauth)/patient/dashboard/components/Sidebar";
import Navbar from "@/components/Navbar"
function Dashboard() {
  const [activeView, setActiveView] = React.useState("DoctorDashboard");
  const [role, setRole] = useState('patient')
  const renderContent = () => {
    switch (activeView) {
      case "DoctorDashboard":
      // return <DoctorDashboard />;
      case "PatientDashboard":
      // return <PatientDashboard />;
      case "Appointments":
      // return <Appointments />;
      case "ManageRelatives":
      // return <ManageRelatives />;
      case "Profile":
      // return <Profile />;
      default:
        return <div>Select a view from the sidebar</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Conditionally render Sidebar based on user role */}

      <Sidebar />


      <div className="flex-1">
        {/* Top Navigation */}

        {/* Main Content */}
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
