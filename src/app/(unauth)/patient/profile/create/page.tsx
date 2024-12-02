'use client'
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import patientSchema from "../../../../../validationSchema/patientSchema"
import { endpoint } from '@/utils/endpoints';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';

const PatientForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const { user } = useUser()
  const initialValues = {
    name: '',
    age: '',
    gender: '',
    address: '',
    weight: '',
    phone: ''
  };

  const handleSubmit = async (values: any) => {


    if (!user) {
      setError("USer not authenticated");
    }

    try {
      const response = await axios.post(endpoint.patient_profile, values);
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: 'top-right'
        })
        router.push('/doctor/list');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-3">
      <Formik
        initialValues={initialValues}
        validationSchema={patientSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <div className='text-center p-2'><h2 className='text-xl font-bold text-gray-500'>Patient Profile</h2></div>
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

            {/* Age Field */}
            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-600 mb-1">Age</label>
              <Field
                type="number"
                id="age"
                name="age"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Gender Field */}
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-600 mb-1">Gender</label>
              <Field
                as="select"
                id="gender"
                name="gender"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
            </div>


            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-600 mb-1">Address</label>
              <Field
                type="text"
                id="address"
                name="address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="weight" className="block text-gray-600 mb-1">Weight</label>
              <Field
                type="number"
                id="weight"
                name="weight"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="weight" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-600 mb-1">Phone Number</label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <h1 className='text-red-500 text-sm'>{error}</h1>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-400 transition-colors"
            >
              Save Details
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

export default PatientForm;
