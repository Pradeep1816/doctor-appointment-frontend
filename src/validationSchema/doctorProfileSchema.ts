import * as yup from 'yup';

const doctorProfileSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot be more than 50 characters'),
  

  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must only contain digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot be more than 15 digits'),
  
  specialty: yup
    .string()
    .required('Specialty is required for doctors'),
  
    schedule_type:yup
     .string()
     .required("Schedule is required"),
  
  location: yup
    .string()
    .required('Location is required')
    .min(5, 'Location must be at least 5 characters')
    .max(100, 'Location cannot be more than 100 characters'),

  experience: yup
    .number()
    .required('Years of experience is required')
    .min(0, 'Experience must be a positive number')
    .max(60, 'Experience cannot exceed 60 years')
});

export default doctorProfileSchema;
