"use client";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import signupSchema from "@/validationSchema/sigunupSchema";
import axios from "axios";
import { endpoint } from "@/utils/endpoints";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<any>({})
  const [loading, setLoading] = useState(false)


  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  async function submit(values: any, { setSubmitting }: any) {

    try {

      await signUp?.create({
        emailAddress: values.email,
        password: values.password,
        unsafeMetadata: { role: values.role }
      });
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setUserData(values)
      setPendingVerification(true);
      setSubmitting(false);

    } catch (error: any) {
      const errorCode = error?.errors[0]?.code;
      if (errorCode === "form_identifier_exists") {
        setError("This email address is already registered. Please try another.");
      } else {
        setError(error.message || "An unexpected error occurred. Please try again.");
      }
      setSubmitting(false);
    }
  }


  async function userRegistration(values: any, clerk_token: any) {

    try {
      const response = await axios.post(endpoint.signup, values, {
        headers: {
          Authorization: `Bearer ${clerk_token}`
        }
      });
      console.log(response)
      const { user_id, role } = response.data
      const user = {
        user_id: user_id,
        role: role
      }
      toast.success("User created successfully!")
      localStorage.setItem('user', JSON.stringify(user))
      return user_id;
    } catch (error: any) {
      toast.success(error.response.data.message);
      setError(error?.response.data.message)
    }

  }


  // Email Verification process
  async function onClickVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);
    try {
      const signedComplete = await signUp.attemptEmailAddressVerification({ code });
      if (signedComplete.status === "complete") {
        await setActive({ session: signedComplete.createdSessionId });

        // const user_id = signedComplete.createdUserId
        const clerk_token = signedComplete.createdSessionId

        if (userData) {
          const doctor_id = await userRegistration({
            email: userData.email,
            password: userData.password,
            role: userData.role,

          },
            clerk_token

          );

          if (userData.role === "doctor") {
            if (doctor_id) {
              router.push(`doctor/profile/create?doctor_id=${doctor_id}`);
            }
          }
          if (userData.role === "patient") {
            router.push("patient/profile/create");
          }
        }


      } else {
        console.log(signedComplete);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Sign Up</h1>
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md border">
        {pendingVerification ? (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Email Verification</h2>
            <form onSubmit={onClickVerify}>
              <div className="flex flex-col py-2">
                <label htmlFor="code" className="text-sm font-semibold text-gray-700 mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  name="code"
                  placeholder="Enter verification code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="outline-none p-3 mt-1 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className={`w-full py-3 mt-4 text-white font-semibold rounded-lg transition duration-300 ease-in-out
                   ${loading ? "bg-teal-300 cursor-not-allowed" : "bg-teal-400 hover:bg-teal-500"}
                  `}
              >
                {loading ? "Verifying.." : " Verify Email"}
              </button>
            </form>
          </div>
        ) : (
          <Formik
            initialValues={{
              email: "",
              password: "",
              role: "patient", // Default role
            }}
            validationSchema={signupSchema}
            onSubmit={submit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex flex-col py-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="outline-none p-3 mt-1 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="flex flex-col py-2">
                  <label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-1">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="outline-none p-3 mt-1 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="flex flex-col py-2">
                  <label htmlFor="role" className="text-sm font-semibold text-gray-700 mb-1">
                    Role
                  </label>
                  <Field
                    as="select"
                    name="role"
                    className="outline-none p-3 mt-1 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                <button
                  type="submit"
                  className="w-full py-3 mt-4 bg-teal-400 text-white font-semibold rounded-lg hover:bg-teal-500 transition duration-300 ease-in-out"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering.." : "Register"}
                </button>
              </Form>
            )}
          </Formik>
        )}
        <p className="text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/sign-in")}
            className="text-teal-500 font-semibold cursor-pointer hover:underline"
          >
            Sign-in
          </span>
        </p>
      </div>
    </div>
  );
}
