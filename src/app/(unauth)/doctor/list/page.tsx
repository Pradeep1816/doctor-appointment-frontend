'use client'

import DoctorCard from '@/app/(unauth)/doctor/list/components/doctorCard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { endpoint } from '@/utils/endpoints'
interface Doctor {
  doctor_id: string
  name: string
  phone: string
  specialty: string
  email: string
  location: string,
  experience: string,
  schedule_type: string
}

function Doctor() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(endpoint.doctor_list)
        setDoctors(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="mb-4 p-3">
        <div className="w-[40%] m-auto flex ">
          <input
            type="text"
            placeholder="Search doctors by name or specialty"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full outline-none"
          />
        </div>
      </div>

      {loading ? (

        <div className="flex justify-center items-center h-48">
          <div className="border-t-4 border-blue-500 border-solid w-16 h-16 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="border flex flex-col m-auto  gap-5">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, ind) => {
              return <DoctorCard key={ind} doctor={doctor} />
            })
          ) : (
            <div className="flex justify-center items-center h-48">
              <h1 className="text-center text-xl font-semibold">No doctors found</h1>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Doctor
