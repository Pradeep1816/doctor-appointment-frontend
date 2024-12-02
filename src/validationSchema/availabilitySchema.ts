import * as Yup from 'yup';

const availabilitySchema = Yup.object().shape({
  availability: Yup.array().of(
    Yup.object().shape({
      isAvailable: Yup.boolean(),

      time_slots: Yup.array().when('isavailable', {
        is: true,
        then: (schema) => schema.min(1, 'At least one time slot is required'),
        otherwise: (schema) => schema.notRequired(),
      }),

      start_time: Yup.string().when('isavailable', {
        is: true,
        then: (schema) => schema.required('Start time is required for available days'),
        otherwise: (schema) => schema.notRequired(),
      }),

      end_time: Yup.string()
        .when('isavailable', {
          is: true,
          then: (schema) => schema.required('End time is required for available days'),
          otherwise: (schema) => schema.notRequired(),
        })
        .test(
          'isValidEndTime',
          'End time must be after start time',
          function (value) {
            const { start_time } = this.parent;
            return !start_time || !value || start_time < value;
          }
        ),
        capacity: Yup.number()
        .when('isavailable', {
          is: true,
          then: (schema) => schema.required('Capacity is required for available days'),
          otherwise: (schema) => schema.notRequired(),
        })
        .min(1, 'Capacity must be at least 1')
        .typeError('Capacity must be a number'),
    })
  ),
});

export default availabilitySchema