import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../schema/registerSchema';
import { toast } from 'react-toastify';
import { showToast } from '../../utils/toast';
import { apiClient } from '../../utils/apiClient';
import Usertoggle from '../buttons/Usertoggle';

function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data) => {
    const toastId = showToast.registering();
    const username = data.name;
    const accountType = data.venueManager ? 'Venue Manager' : 'Customer';
    try {
      await apiClient('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      await new Promise((res) => setTimeout(res, 1500));
      toast.dismiss(toastId);

      await new Promise((res) => setTimeout(res, 500));
      showToast.registerSuccess(username, accountType);

      setTimeout(() => {
        reset();
        navigate('/login');
      }, 5000);
    } catch (error) {
      console.error('Error sending form:', error);
      const apiMessage = error?.data?.errors?.[0]?.message;
      const errorMessage =
        `${apiMessage}. Please try again.` ||
        'Something went wrong during registration. Please try again.';
      await new Promise((res) => setTimeout(res, 2000));
      toast.dismiss(toastId);
      await new Promise((res) => setTimeout(res, 500));
      showToast.error(errorMessage);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
       <div className='w-fit min-w-[588px] bg-marine h-fit px-20 py-6 flex justify-center align-center mb-12'>
        <h1 className="uppercase font-chonburi text-center break-word py-6 w-fit h-fit text-buoy text-6xl md:text-8xl">
          Register
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, (formErrors) => {
          console.error('Form errors:', formErrors);
        })}
        className={`flex flex-col gap-6 md:w-[800px] max-w-[700px] mt-10 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
      >
          <div className="flex items-center p-2 w-full mb-7">
            <Usertoggle register={register} setValue={setValue}/>
          </div>
          {errors.venueManager && (
            <p className="error-message">{errors.venueManager.message}</p>
          )}
        <label className="label-base group">
          User name
          <input
            type="text"
            {...register('name')}
            autoComplete="name"
            className="input-base"
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </label>
        <label className="label-base group">
          Email
          <input
            type="email"
            {...register('email')}
            autoComplete="email"
            className="input-base"
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </label>
        <label className="label-base group">
          Password
          <input
            type="password"
            {...register('password')}
            autoComplete="new-password"
            className="input-base"
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </label>
        <label className="label-base group mb-20">
          Confirm Password
          <input
            type="password"
            {...register('passwordConfirm')}
            autoComplete="off"
            className="input-base"
          />
          {errors.passwordConfirm && (
            <p className="error-message">{errors.passwordConfirm.message}</p>
          )}
        </label>
        <button
          type="submit"
          className="btn-l btn-primary mt-6 mb-8 disabled:bg-gray-100 disabled:text-gray-400"
          disabled={isSubmitting}
        >
          {' '}
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>
      </form>
    </>
  );
}

export default RegisterForm;
