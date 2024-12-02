import { endpoint } from '@/utils/endpoints';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface DoctorCardProps {
  doctor: {
    doctor_id: string,
    name: string
    phone: string,
    specialty: string,
    email: string,
    location: string
    experience: string
    schedule_type: string

  };
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {

  const [isAvailable, setIsAvailable] = useState<[]>([])

  useEffect(() => {
    async function getAvailability() {
      try {
        const response = await axios.get(`${endpoint.get_availability}/${doctor.doctor_id}`)

        setIsAvailable(response.data)

      } catch (error) {
        console.log(error)
      }
    }
    getAvailability()
  }, [doctor])

  console.log(doctor)
  return (
    <Link href={`/doctor/list/details/${doctor.doctor_id}`}>
      <div className="group w-[90%] m-auto border-b p-4 py-5">
        <div className="flex items-center space-x-4">
          <div>
            <img
              src="/images/doctor.jpg"
              alt="Doctor"
              className="w-20 h-20 rounded-full object-cover object-center"
            />
            <p className='mt-3 text-teal-500 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity'>view details</p>
          </div>
          <div>
            <h2 className="text-lg text-teal-500 font-bold">{doctor.name}
            </h2>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
            <p className='text-sm text-gray-600'>{doctor.experience} years experience overall</p>
            <p className='text-sm text-gray-600'>{doctor.location}</p>

            <p className="text-sm text-gray-500">
              ₹1000 Consultation fee at clinic
            </p>

            <div className="flex items-center mt-2">
              <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-md text-xs">
                rating%
              </span>
              <p className="ml-2 text-xs text-blue-600">
                Patient Stories
              </p>
            </div>
          </div>

        </div>

        <div className="mt-4">
          <div className="flex items-center justify-end space-x-2">
            <p className={`${isAvailable ? "bg-teal-100 w-[150px]" : "bg-red-100  "} w-[150px] p-1 rounded-full text-center`}>
              {isAvailable ? "Available Today" : " Not Available"}
            </p>
          </div>
        </div>


      </div>
    </Link>
  );
};

export default DoctorCard;


