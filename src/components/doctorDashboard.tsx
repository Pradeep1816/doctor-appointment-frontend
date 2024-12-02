import React from "react";
import Sidebar from "./sideBarDoctor";

const DoctorDashboard = () => {
  const appointments = [
    { id: 1, patient: "John Doe", date: "22nd July, 2024" },
    { id: 2, patient: "Jane Smith", date: "22nd July, 2024" },
  ];

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold text-lg">Doctors</h3>
          <p className="text-3xl font-bold text-blue-500">14</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold text-lg">Appointments</h3>
          <p className="text-3xl font-bold text-blue-500">2</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold text-lg">Patients</h3>
          <p className="text-3xl font-bold text-blue-500">5</p>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="font-bold text-lg mb-4">Latest Appointments</h3>
        <ul>
          {appointments.map((appt) => (
            <li
              key={appt.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-bold">{appt.patient}</p>
                <p className="text-sm text-gray-500">{appt.date}</p>
              </div>
              <button className="text-red-500">Cancel</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDashboard;
