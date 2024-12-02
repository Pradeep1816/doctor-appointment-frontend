'use client'
import { endpoint } from "@/utils/endpoints";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link"
import { useUser } from "@clerk/nextjs";
import router from "next/router";
import { useRouter } from "next/navigation";

interface DoctorTimeSlotProps {
  doctor: any;
}

const DoctorTimeSlot = ({ doctor }: DoctorTimeSlotProps) => {
  const [availability, setAvailability] = useState<any>([]);
  const [morningSlots, setMorningSlots] = useState<string[]>([]);
  const [eveningSlots, setEveningSlots] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectTimeSlot] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState('')
  const [bookedSlots, setBookedSlots] = useState<{ appointment_time: string }[]>([])

  const { user } = useUser()
  const router = useRouter()


  useEffect(() => {
    if (doctor) {
      getAvailability();
    }
  }, [doctor]);

  const getAvailability = async () => {
    try {
      const response = await axios.get(`${endpoint.get_availability}/${doctor.doctor_id}`);
      setAvailability(response.data);
    } catch (error) {
      console.error("Error fetching availability:", error);
      toast.error("Failed to fetch availability. Please try again.");
    }
  };


  const getBookedSlots = async () => {
    try {
      const response = await axios.get(`${endpoint.booked_slots}/${doctor.doctor_id}`);

      console.log(response.data)
      setBookedSlots(response.data);
    } catch (error) {
      console.error("Error fetching booked slots:", error);
      toast.error("Failed to fetch booked slots. Please try again.");
    }
  };

  useEffect(() => {
    getBookedSlots()
  }, [])



  const generateStreamTimeSlots = (start: string, end: string, capacity: number): string[] => {
    const startTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);
    const totalMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    const slotDuration = Math.floor(totalMinutes / capacity);
    const slots: string[] = [];

    for (let i = 0; i < capacity; i++) {
      const slotStart = new Date(startTime.getTime() + i * slotDuration * 60 * 1000);
      const slotEnd = new Date(slotStart.getTime() + slotDuration * 60 * 1000);
      slots.push(
        `${slotStart.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${slotEnd.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      );
    }
    return slots;
  };

  const generateWaveTimeSlots = (start: string, end: string, capacity: number): string[] => {
    const patientsPerSlot = 3;
    const totalSlots = Math.ceil(capacity / patientsPerSlot);
    const startTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);
    const totalMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    const slotDuration = Math.floor(totalMinutes / totalSlots);
    const slots: string[] = [];

    for (let i = 0; i < totalSlots; i++) {
      const slotStart = new Date(startTime.getTime() + i * slotDuration * 60 * 1000);
      const slotEnd = new Date(slotStart.getTime() + slotDuration * 60 * 1000);
      slots.push(
        `${slotStart.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${slotEnd.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      );
    }
    return slots;
  };


  function getDateForDay(day: string): string {
    const dayMap: { [key: string]: number } = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    const today = new Date();
    const currentDayIndex = today.getDay();
    const targetDayIndex = dayMap[day];

    if (targetDayIndex === -1) {
      console.log("Invalid day")
    }

    const diff = (targetDayIndex - currentDayIndex + 7) % 7;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);
    const date = targetDate.toISOString().split("T")[0];

    return date;
  }



  useEffect(() => {
    if (selectedDay) {
      const morning: string[] = [];
      const evening: string[] = [];

      availability.forEach((day: any) => {
        if (day.isavailable && day.day_of_week === selectedDay) {
          const { start_time, end_time, capacity } = day;
          if (start_time < "12:00") {
            const morningEnd = end_time > "12:00" ? "12:00" : end_time;
            const slots =
              doctor.schedule_type === "Stream"
                ? generateStreamTimeSlots(start_time, morningEnd, capacity)
                : generateWaveTimeSlots(start_time, morningEnd, capacity);
            morning.push(...slots);
          }

          if (end_time > "12:00") {
            const eveningStart = start_time < "12:00" ? "12:00" : start_time;
            const slots =
              doctor.schedule_type === "Stream"
                ? generateStreamTimeSlots(eveningStart, end_time, capacity)
                : generateWaveTimeSlots(eveningStart, end_time, capacity);
            evening.push(...slots);
          }
        }
      });

      setMorningSlots(morning);
      setEveningSlots(evening);
    }
  }, [selectedDay, availability, doctor]);

  const handleBookingAppointment = () => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;

    if (!user.role) {
      toast.success('Only patients can book an appointment.');
      return;
    }


    if (!selectedTimeSlot || !selectedDay) {
      alert('Please select a date and timeslot to book an appointment.');
      return;
    }

    if (!user || !user.user_id) {
      toast.success('You need to be logged in to book an appointment.');
      return;
    }

    const date = getDateForDay(selectedDay)

    try {
      axios
        .post(`${endpoint.book_appointment}`, {
          doctor_id: doctor.doctor_id,
          user_id: user.user_id,
          appointment_date: date,
          appointment_time: selectedTimeSlot,
        })
        .then((response) => {
          console.log(response)
          toast.success("Your appointment Booked!");
          router.push('/patient/dashboard')
        })
        .catch((error) => {
          alert('Failed to book appointment. Please try again.');
        });
    } catch (error) {

    }
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-blue-100 p-4 rounded-md mb-4">
        <h2 className="text-xl font-bold">Clinic Appointment</h2>
        <p className="text-lg">₹ 1000 fee</p>
        <div className="text-gray-600 mt-2">
          <p>Moti Nagar</p>
          <Link href="/doctor/list" className="text-teal-500"><h2>visit doctors</h2></Link>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Available Days</h3>
        <div className="flex space-x-4 mt-4">
          {availability.map((day: any, index: number) =>
            day.isavailable ? (
              <button
                key={index}
                className={`px-2 text-sm py-2 rounded-md ${selectedDay === day.day_of_week ? "bg-teal-500 text-white" : "bg-white border"
                  }`}
                onClick={() => setSelectedDay(day.day_of_week)}
              >
                {day.day_of_week}({getDateForDay(day.day_of_week)})
              </button>
            ) : null
          )}
        </div>
      </div>

      {selectedDay && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Time Slots for {selectedDay}</h3>
          <div className="mt-4 flex flex-col gap-4">
            {/* Morning Slots */}
            <div>
              <h4 className="font-medium text-gray-700">Morning ({morningSlots.length - bookedSlots.length} slots)</h4>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {morningSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    disabled={bookedSlots.some((booked) => booked.appointment_time === slot)}
                    className={`py-2 border text-[9px] rounded-md text-center
                      ${bookedSlots.some((booked) => booked.appointment_time === slot) ? "bg-gray-400 text-gray-600 cursor-not-allowed" :
                        selectedTimeSlot === slot ? "bg-teal-500 text-white" : "border-teal-500 text-teal-500"}`}

                    onClick={() => setSelectTimeSlot(slot)}
                  >
                    {slot}
                  </button>

                ))}
              </div>
            </div>
            {/* Evening Slots */}
            <div>
              <h4 className="font-medium text-gray-700">Evening ({eveningSlots.length} slots)</h4>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {eveningSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    disabled={bookedSlots.some((booked) => booked.appointment_time === slot)}
                    className={`py-2 border text-[9px] rounded-md text-center
                      ${bookedSlots.some((booked) => booked.appointment_time === slot) ? "bg-gray-400 text-gray-600 cursor-not-allowed" :
                        selectedTimeSlot === slot ? "bg-teal-500 text-white" : "border-teal-500 text-teal-500"}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
      }

      {
        selectedDay && (
          <button
            onClick={handleBookingAppointment}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Book Appointment
          </button>
        )
      }
    </div >
  );
};

export default DoctorTimeSlot;
