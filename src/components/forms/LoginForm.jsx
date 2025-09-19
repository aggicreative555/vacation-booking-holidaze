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

      const result = await response;

      const token = response.data.accessToken;
      const key = response.data.apiKey;
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
      <h1 className="uppercase font-garamond w-full text-center break-word max-w-[400px] md:max-w-[450px] mb-4 mt-8 text-red-800 text-3xl md:text-5xl">
        Log in
      </h1>
      <span className="h-[1px] w-2/4 bg-black m-[1px]"></span>
      <span className="h-[1px] w-2/4 bg-black m-[1px]"></span>
      <form
        onSubmit={handleSubmit(onSubmit, (formErrors) => {
          console.error('Form errors:', formErrors);
        })}
        className={`flex flex-col gap-6 md:w-96 mt-10 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <label className="label-base group">
          Email
          <input
            type="email"
            {...register('email')}
            autoComplete="email"
            className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
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
            className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </label>
        <button
          type="submit"
          className="btn-l btn-primary disabled:bg-gray-100 disabled:text-gray-400"
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
