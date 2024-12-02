import React from "react";

const PatientDashboard = () => {
  const doctors = [
    { id: 1, name: "Dr. Richard Jones", specialization: "Cardiologist" },
    { id: 2, name: "Dr. Sarah Lee", specialization: "Dentist" },
  ];

  return (
    <div>
      {/* Available Doctors */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="font-bold text-lg mb-4">Available Doctors</h3>
        <ul>
          {doctors.map((doc) => (
            <li key={doc.id} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-bold">{doc.name}</p>
                <p className="text-sm text-gray-500">{doc.specialization}</p>
              </div>
              <button className="text-blue-500">Book Appointment</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientDashboard;
