import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../schema/registerSchema';
import { toast } from 'react-toastify';
import { showToast } from '../../utils/toast';
import { apiClient } from '../../utils/apiClient';


function RegisterForm() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
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
          showToast.registerSuccess(username,accountType);
    
          setTimeout(() => {
            reset();
            navigate('/login');
          }, 5000);
        } catch (error) {
            console.error('Error sending form:', error);
            const apiMessage =  error?.data?.errors?.[0]?.message;
            const errorMessage = `${apiMessage}. Please try again.` || 'Something went wrong during registration. Please try again.'
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
                Register a user
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
                Full Name
                <input
                    type="text"
                    {...register('name')}
                    autoComplete="name"
                    className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
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
                <label className="label-base group">
                Confirm Password
                <input
                    type="password"
                    {...register('passwordConfirm')}
                    autoComplete="off"
                    className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
                />
                {errors.passwordConfirm && (
                    <p className="error-message">{errors.passwordConfirm.message}</p>
                )}
                </label>
                <label className="label-base group">
                Account type
                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-600">Customer</span>

                        <input
                        type="checkbox"
                        {...register('venueManager')}
                        className="peer sr-only"
                        id="venueManagerToggle"
                        />

                        <label
                        htmlFor="venueManagerToggle"
                        className="toggle-label relative block w-12 h-6 bg-gray-300 rounded-full shadow-inner cursor-pointer transition-colors duration-300 peer-checked:bg-black"
                        >
                            <span
                                className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:-translate-6"
                            ></span>
                        </label>

                        <span className="text-sm text-gray-600">Venue Manager</span>

                    </div>
                {errors.venueManager && (
                    <p className="error-message">{errors.venueManager.message}</p>
                )}
                </label>
                <button
                type="submit"
                className="btn-l btn-primary disabled:bg-gray-100 disabled:text-gray-400"
                disabled={isSubmitting}
                >
                {' '}
                {isSubmitting ? 'Creating account...' : 'Register'}
                </button>
            </form>
        </>
    )
}

export default RegisterForm;