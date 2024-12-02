'use client'
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import doctorProfileSchema from "../../../../../validationSchema/doctorProfileSchema"
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { endpoint } from '@/utils/endpoints';
import { useUser } from '@clerk/nextjs';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  specialty: '',
  schedule_type: '',
  location: '',
  experience: ''
};


const DoctorProfileForm = () => {

  const [error, setError] = useState('')
  const router = useRouter()
  const { user } = useUser();
  const searchParams = useSearchParams()

  const doctor_id = searchParams.get('doctor_id');

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post(endpoint.doctor_profile, values);
      if (response.status === 201) {
        if (doctor_id) {
          router.push(`/doctor/profile/availability?doctor_id=${doctor_id}`)
        }
      }

    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setError(error.response.data.message)
      }

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-3">
      <Formik
        initialValues={initialValues}
        validationSchema={doctorProfileSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <div className='text-center p-2'><h2 className='text-xl font-bold text-gray-500'>Doctor Profile</h2></div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600 mb-1">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-1">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="experience" className="block text-gray-600 mb-1">Years of Experience</label>
              <Field
                type="number"
                id="experience"
                name="experience"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="experience" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-600 mb-1">Phone</label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="specialty" className="block text-gray-600 mb-1">Specialty</label>
              <Field
                type="text"
                id="specialty"
                name="specialty"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="specialty" component="div" className="text-red-500 text-sm mt-1" />
            </div>


            <div className="mb-4">
              <label htmlFor="schedule_type" className="block text-gray-600 mb-1">Schedule Type</label>
              <Field
                as="select"
                id="schedule_type"
                name="schedule_type"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select schedule type</option>
                <option value="Stream">Stream</option>
                <option value="Wave">Wave</option>
              </Field>
              <ErrorMessage name="schedule_type" component="div" className="text-red-500 text-sm mt-1" />
            </div>


            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-600 mb-1">Location</label>
              <Field
                type="text"
                id="location"
                name="location"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />

              <h1 className='text-red-500 text-sm'>{error}</h1>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-400 transition-colors"
            >
              Save Profile
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full mt-3 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Back
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DoctorProfileForm;
