import * as yup from 'yup';

export const profileSchema = yup.object().shape({
  bio: yup
    .string()
    .min(10, 'Your description must include at least 10 characters'),

  avatar: yup.object().shape({
    url: yup.string().url('Please enter a valid url starting with https//'),
    alt: yup.string(),
  }),

  banner: yup.object().shape({
    url: yup.string().url('Please enter a valid url starting with https//'),
    alt: yup.string(),
  }),
});
