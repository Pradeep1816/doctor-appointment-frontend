import React from "react";

const SideBarDoctor = ({ setActiveView }: any) => {
  return (
    <aside className="w-64 bg-stone-900 text-white flex flex-col p-4">
      <h2 className="text-lg font-bold mb-6">Prescripto</h2>
      <button
        className="py-2 px-4 rounded bg-stone-400 hover:bg-stone-500 mb-4 text-left"
        onClick={() => setActiveView("DoctorDashboard")}
      >
        Dashboard
      </button>
      <button
        className="py-2 px-4 rounded bg-stone-400 hover:bg-stone-500 mb-4 text-left"
        onClick={() => setActiveView("PatientDashboard")}
      >
        Appointments
      </button>
      <button className="py-2 px-4 bg-stone-400 hover:bg-stone-500 mb-4 text-left">
        Add Doctor
      </button>
      <button className="py-2 px-4 bg-stone-400 hover:bg-stone-500 text-left">
        Doctor List
      </button>
    </aside>
  );
};

export default SideBarDoctor;
