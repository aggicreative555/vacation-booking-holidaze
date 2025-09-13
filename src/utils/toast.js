import { toast } from 'react-toastify';

export const showToast = {
    loginSuccess: (username) =>
    toast.success(`Welcome back ${username}!`, {
        className:
            'p-6 shadow-md bg-green-100 border border-green-800 text-green-800 font-garamond italic normal-case text-base rounded-none',
        hideProgressBar: false,
        autoClose: 1500,
        progressClassName: 'bg-green-800 rounded',
    }),

    logoutSuccess: (username) =>
    toast.success(`${username} is logged out.` || 'You are logged out.', {
        className:
            'p-6 shadow-md bg-green-100 border border-green-800 text-green-800 font-garamond italic normal-case text-base rounded-none',
        hideProgressBar: false,
        autoClose: 1000,
        progressClassName: 'bg-green-800 rounded',
    }),

    registerSuccess: (username, accountType) =>
    toast.success(`${username} has been usccessfully registered as a ${accountType} `, {
       className:
        'p-6 shadow-md bg-green-100 border border-green-800 text-green-800 font-garamond italic normal-case text-base rounded-none',
      hideProgressBar: false,
      progressClassName: 'bg-green-800 rounded',
    }),

    registering: (message = 'Registering user. Please wait ...') =>
    toast.loading(message, {
      className:
        'p-6 shadow-md bg-amber-100 border border-amber-800 text-amber-800 font-garamond italic normal-case text-base rounded-none',
      hideProgressBar: false,
      progressClassName: 'bg-amber-800 rounded',
    }),

    bookingAdded: (bookingId, bookingName) =>
    toast.success(`${bookingName} added to cart!`, {
      className:
        'p-6 shadow-md bg-green-100 border border-green-800 text-green-800 font-garamond italic normal-case text-base rounded-none',
      hideProgressBar: true,
      autoClose: 300,
      closeButton: false,
      toastId: `item-added-${bookingId}`,
    }),

    bookingRemoved: (bookingId, bookingName) =>
    toast.error(`${bookingName} removed from your trips.`, {
      className:
        'p-6 shadow-md bg-red-100 border border-red-800 text-red-800 font-garamond italic normal-case text-base rounded-none',
      hideProgressBar: true,
      autoClose: 300,
      closeButton: false,
      toastId: `item-removed-${bookingId}`,
    }),

    bookingsEmpty: (message = 'Your bookings are empty.') =>
    toast.error(message, {
      className:
        'p-6 shadow-md bg-red-100 border border-red-800 text-red-800 font-garamond italic normal-case text-base rounded-none',
      hideProgressBar: true,
      autoClose: 500,
    }),

    error: (
    message = 'Something went wrong! Please try again by refreshing the page.'
  ) =>
    toast.error(message, {
      className:
        'p-6 shadow-md bg-red-100 border border-red-800 text-red-800 font-garamond italic normal-case text-base rounded-none',
      hideProgressBar: true,
      autoClose: 1500,
    }),

    booking: (message = 'Booking your vacation...') =>
    toast.loading(message, {
      className:
        'p-6 shadow-md bg-amber-100 border border-amber-800 text-amber-800 font-garamond italic normal-case text-base rounded-none',
      hideProgressBar: false,
      progressClassName: 'bg-amber-800 rounded',
    }),

    loading: (message = 'Please wait while the operation is loading...') =>
    toast.loading(message, {
      className:
        'p-6 shadow-md bg-amber-100 border border-amber-800 text-amber-800 font-garamond italic normal-case text-base rounded-none',
      hideProgressBar: false,
      progressClassName: 'bg-amber-800 rounded',
    }),

    venueCreated: () =>
    toast.success(`Your venue has been successfully created`, {
      className:
        'p-6 shadow-md bg-green-100 border border-green-800 text-green-800 font-garamond italic normal-case text-base rounded-none',
      hideProgressBar: true,
      autoClose: 500,
      closeButton: false,
    }),

    venueUpdated: () =>
    toast.success(`Your venue has been successfully updated`, {
      className:
        'p-6 shadow-md bg-green-100 border border-green-800 text-green-800 font-garamond italic normal-case text-base rounded-none',
      hideProgressBar: true,
      autoClose: 500,
      closeButton: false,
    }),

    profileUpdated: () =>
    toast.success(`Your profile has been successfully updated`, {
      className:
        'p-6 shadow-md bg-green-100 border border-green-800 text-green-800 font-garamond italic normal-case text-base rounded-none',
      hideProgressBar: true,
      autoClose: 500,
      closeButton: false,
    }),
};
