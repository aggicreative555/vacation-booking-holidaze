import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup
    .string()
    .required('Email is required.')
    .matches(/@stud\.noroff\.no$/, 'Must be a valid stud.noroff.no email'),
    password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters')
    .max(30, 'Password cannot be longer than 30 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/,
      'Password must contain both letters and numbers'),

})
