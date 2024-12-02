const BASE_URL=process.env.NEXT_PUBLIC_API_BASE_URL

export const endpoint={

     doctor_list:`${BASE_URL}/doctor-list`,
     doctor_profile: `${BASE_URL}/doctor-profile`,
     patient_profile:`${BASE_URL}/patient-profile`,
     doctor: `${BASE_URL}/doctor`,
     signup: `${BASE_URL}/auth/sign-up`,
     get_availability: `${BASE_URL}/availability/doctor`,
     book_appointment: `${BASE_URL}/appointment/create-appointment`,
     availability: `${BASE_URL}/availability/create-availability`,
     booked_slots: `${BASE_URL}/appointment/get-booked-slots`
}