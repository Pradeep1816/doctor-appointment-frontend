import * as Yup from "yup"
const patientSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),

  age: Yup.number()
    .required('Age is required')
    .min(0, 'Age must be a positive number')
    .max(120, 'Please enter a valid age'),

  gender: Yup.string()
    .required('Gender is required')
    .oneOf(['Male', 'Female', 'Other'], 'Please select a valid sex'),

  address: Yup.string()
    .required('Address is required'),

  weight: Yup.number()
    .required('Weight is required')
    .positive('Weight must be a positive number')
    .max(300, 'Please enter a valid weight'),

    phone: Yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must only contain digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot be more than 15 digits'),
})

export default patientSchema