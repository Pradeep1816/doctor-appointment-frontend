'use client';
import React, { useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { endpoint } from '@/utils/endpoints';
import toast from 'react-hot-toast';
import availabilitySchema from '@/validationSchema/availabilitySchema';
import { useRouter } from 'next/navigation';

const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['Morning', 'Evening'];

const initialValues = {
  availability: dayOfWeek.map((day_of_week) => ({
    day_of_week,
    isavailable: false,
    time_slots: [],
    start_time: '',
    end_time: '',
    capacity: 1
  })),
};



const DoctorAvailability = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const handleSubmit = async (values: any, { resetForm }: any) => {

    console.log(values)
    try {
      const response = await axios.post(endpoint.availability, values);
      if (response.status === 201) {
        resetForm();
        toast.success('Your availability is created successfully!', {
          position: 'top-right',
        });
      }
      router.push("/doctor/dashboard")
    } catch (err) {
      setError('Error saving availability. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Doctor Availability
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={availabilitySchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              {values.availability.map((day, index) => (
                <div key={day.day_of_week} className="mb-6 border-b pb-4">
                  <div className="flex items-center gap-4 mb-2">
                    <Field
                      type="checkbox"
                      name={`availability[${index}].isavailable`}
                      className="h-5 w-5"
                    />
                    <span className="text-gray-600">{day.day_of_week}</span>
                  </div>
                  {day.isavailable && (
                    <>
                      {/* Time Slots */}
                      <div className="mb-4">
                        <label
                          htmlFor={`availability[${index}].time_slots`}
                          className="block text-gray-600 mb-1"
                        >
                          Time Slots
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {timeSlots.map((slot) => (
                            <label
                              key={slot}
                              className="flex items-center gap-2 text-gray-600"
                            >
                              <Field
                                type="checkbox"
                                name={`availability[${index}].time_slots`}
                                value={slot.toLowerCase()}
                                className="h-5 w-5"
                              />
                              {slot}
                            </label>
                          ))}
                        </div>
                        <ErrorMessage
                          name={`availability[${index}].time_slots`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Start Time */}
                      <div className="mb-4">
                        <label
                          htmlFor={`availability[${index}].start_time`}
                          className="block text-gray-600 mb-1"
                        >
                          Start Time
                        </label>
                        <Field
                          type="time"
                          name={`availability[${index}].start_time`}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage
                          name={`availability[${index}].start_time`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* End Time */}
                      <div className="mb-4">
                        <label
                          htmlFor={`availability[${index}].end_time`}
                          className="block text-gray-600 mb-1"
                        >
                          End Time
                        </label>
                        <Field
                          type="time"
                          name={`availability[${index}].end_time`}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage
                          name={`availability[${index}].end_time`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      {/* Capacity */}
                      <div className="mb-4">
                        <label
                          htmlFor={`availability[${index}].capacity`}
                          className="block text-gray-600 mb-1"
                        >
                          Capacity
                        </label>
                        <Field
                          type="number"
                          name={`availability[${index}].capacity`}
                          min="1"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage
                          name={`availability[${index}].capacity`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition"
              >
                Save Availability
              </button>
              {error && <div className="text-red-500 text-sm mt-3">{error}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DoctorAvailability;
