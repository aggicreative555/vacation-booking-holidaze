import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please enter your full name')
      .min(3, 'Your full name must include at least 3 characters')
      .matches(
      /^[A-Za-z_]+$/,
      'Name can only contain uppercase or lowercase letters and underscores'
    ),
    emailNoroff: yup
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
    passwordConfirm: yup
      .string()
      .required('Please confirm your passsord')
      .oneOf([yup.ref('password')], 'Password must match'),
    venueManager: yup
    .boolean()
    .typeError('Please select an account type')

})
