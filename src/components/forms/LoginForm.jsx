import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { showToast } from '../../utils/toast';
import { apiClient } from '../../utils/apiClient';
import { loginSchema } from '../../schema/loginSchema';
import { useAuthStore } from '../../stores/useAuthStore';

function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data) => {
    const toastId = showToast.loading();

    try {
      const response = await apiClient('/auth/login?_holidaze=true', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const result = response;

      const token = result.data.accessToken;
      const key = result.data.apiKey;
      if (!token && !key)
        throw new Error('No access token or api key returned from API');
      localStorage.setItem('accessToken', token);

      await new Promise((res) => setTimeout(res, 1500));
      toast.dismiss(toastId);

      const username = result.data?.name || 'User';
      login(result.data);
      await new Promise((res) => setTimeout(res, 500));
      showToast.loginSuccess(username);

      setTimeout(() => {
        reset();
        navigate('/');
      }, 1000);
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
      <div className="w-fit md:min-w-[588px] bg-marine h-fit px-20 py-6 flex justify-center align-center mb-12">
        <h1 className="uppercase font-chonburi text-center break-word py-6 w-fit h-fit text-buoy text-4xl md:text-8xl">
          Log in
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, (formErrors) => {
          console.error('Form errors:', formErrors);
        })}
        className={`flex flex-col gap-6 md:w-[588px] max-w-[588px] mt-10 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <label className="label-base group">
          Email
          <input
            type="email"
            {...register('email')}
            autoComplete="email"
            className="input-base text-left font-normal text-dark"
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </label>
        <label className="label-base group mb-20">
          Password
          <input
            type="password"
            {...register('password')}
            autoComplete="new-password"
            className="input-base text-left font-normal text-dark"
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </label>
        <button
          type="submit"
          className="btn-l btn-primary mt-6 mb-8 disabled:bg-gray-100 disabled:text-gray-400"
          disabled={isSubmitting}
        >
          {' '}
          {isSubmitting ? 'Logging in' : 'Log in'}
        </button>
      </form>
    </>
  );
}

export default LoginForm;
