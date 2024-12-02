import React from "react";

const SidebarPatient = ({ setActiveView }: any) => {
  return (
    <aside className="w-64 bg-blue-700 text-white flex flex-col p-4">
      <h2 className="text-lg font-bold mb-6">Prescripto</h2>
      <button
        className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 mb-4 text-left"
        onClick={() => setActiveView("PatientDashboard")}
      >
        Dashboard
      </button>
      <button
        className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 mb-4 text-left"
        onClick={() => setActiveView("Appointments")}
      >
        Appointments
      </button>
      <button
        className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 mb-4 text-left"
        onClick={() => setActiveView("ManageRelatives")}
      >
        Manage Relatives
      </button>
      <button
        className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 text-left"
        onClick={() => setActiveView("Profile")}
      >
        Profile
      </button>
    </aside>
  );
};

export default SidebarPatient;
