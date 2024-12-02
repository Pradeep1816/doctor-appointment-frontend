'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LocateIcon, MapPin, GraduationCap } from 'lucide-react';
import { endpoint } from '@/utils/endpoints';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import DoctorTimeSlot from '../../components/DoctorTimeSlot';

function DoctorPage() {
  const { user } = useUser()
  const router = useRouter()
  // const patient_id = user?.id
  const params = useParams();
  const id = params?.id;
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState<any>(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`${endpoint.doctor}/${id}`)
        .then((response) => {
          setDoctor(response.data);

          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Doctor Details */}
        <div className="md:col-span-2 bg-white shadow p-4 rounded">
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
            {/* Image Section */}
            <div className="w-full md:w-1/3">
              <img
                src="/images/doctor.jpg"
                alt="Doctor"
                className="rounded w-full object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col gap-4 w-full md:w-2/3">
              <h1 className="text-3xl font-bold">{doctor.name}</h1>
              <p className="flex gap-2 text-gray-700">
                <GraduationCap />
                {doctor.experience} Years Experience Overall  (18 years as specialist).
              </p>
              <p className="flex gap-2 text-gray-700">
                <MapPin />
                {doctor.location}
              </p>
              <p className="text-center bg-teal-100 w-[150px] px-1 py-0.5 rounded-lg">
                {doctor.specialty}
              </p>
            </div>
          </div>
          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">About Me</h2>
            <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus fugiat quisquam libero aliquam nulla aspernatur placeat itaque qui molestias dignissimos, incidunt dicta neque, iusto ducimus veniam tempore. Beatae, cum nam!</p>
          </div>
        </div>

        {/* Doctor Suggestions */}
        <div className="bg-white shadow p-4 rounded">
          <DoctorTimeSlot doctor={doctor} />
        </div>
      </div>
    </div >
  );
}

export default DoctorPage;
