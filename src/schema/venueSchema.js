import * as yup from 'yup';

export const venueSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter the name of your venue')
    .min(3, 'Your venue must include at least 3 characters'),

  description: yup
    .string()
    .required('Please describe your venue briefly')
    .min(10, 'Your description must include at least 10 characters'),

  price: yup
    .number()
    .required('Please enter a price in NOK')
    .min(100, 'Your price must be greater than 100'),

  maxGuests: yup
    .number()
    .required('Please enter the maximum number of guests')
    .min(1, 'At least 1 guest is required'),

  media: yup
    .array()
    .of(
      yup.object().shape({
        url: yup
          .string()
          .url('Please enter a valid url starting with https//')
          .required('Please include the image url'),
        alt: yup
          .string()
          .required(
            'Please include a brief description of the image for disabled users'
          ),
      })
    )
    .min(1, 'Please include at least one image'),

  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),

  location: yup.object().shape({
    country: yup
      .string()
      .required('Please include the country where your venue is located')
      .min(2, 'Please enter a country with at least 2 characters'),
    city: yup
      .string()
      .required('Please include the city where your venue is located')
      .min(2, 'Please enter a city with at least 2 characters'),
    address: yup
      .string()
      .min(3, 'Please enter an adress with at least 3 characters'),
    zip: yup
      .string()
      .min(3, 'Please enter a zip code with at least 3 characters'),
    continent: yup
      .string()
      .min(3, 'Please enter a continent with at least 3 characters'),
  }),
});
