import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { showToast } from '../../utils/toast';
import { profileSchema } from '../../schema/profileSchema';
import { toast } from 'react-toastify';
import { apiClient } from '../../utils/apiClient';
import { useAuthStore } from '../../stores/useAuthStore';


function EditProfileForm({ user, onClose }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(profileSchema),
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: {
            bio: `${user?.data.bio}` || '',
            avatar: {
                url: `${user?.data.avatar?.url}` || '', 
                alt: `${user?.data.avatar?.alt}` || 'User avatar picture'
            },
            banner: {
                url: `${user?.data.avatar?.url}` || '', 
                alt: `${user?.data.banner?.alt}` || 'User banner picture',
            },
        }
    });

    const { updateUser } = useAuthStore();
    console.log(user);

    const onSubmit = async (data) => {
        const toastId = showToast.loading('Updating Profile...');
        try {
            const updatedUser = await apiClient(`/holidaze/profiles/${user?.data.name}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            }, true, true);

            updateUser(updatedUser);
            console.log(updatedUser);

            await new Promise((res) => setTimeout(res, 1500));
            toast.dismiss(toastId);

            await new Promise((res) => setTimeout(res, 2000));
            showToast.profileUpdated();
            if (onClose) onClose();

            await new Promise((res) => setTimeout(res, 1500));
            window.location.reload(true);
    
        } catch (error) {
            console.error('Error updating profile:', error);
            const apiMessage =  error?.data?.errors?.[0]?.message;
            const errorMessage = `${apiMessage}. Please try again.` || 'Something went wrong when updating your profile. Please try again later.'
            showToast.error(errorMessage);
        } finally {
          toast.dismiss(toastId);
        }
    };

    return (
        <>
            <h1 className="uppercase font-garamond w-full text-center break-word max-w-[400px] md:max-w-[450px] mb-4 mt-8 text-red-800 text-3xl md:text-5xl">
                Update profile
            </h1>
            <span className="h-[1px] w-2/4 bg-black m-[1px]"></span>
            <span className="h-[1px] w-2/4 bg-black m-[1px]"></span>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`flex flex-col gap-6 md:w-96 mt-10 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
            >
                <p className="text-xl font-garamond">
                {user?.name}
                </p>
                <label className="label-base group">
                My Bio
                <input
                    type="text"
                    {...register('bio')}
                    className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
                />
                {errors.bio && (
                    <p className="error-message">{errors.bio.message}</p>
                )}
                </label>
                {/* Banner */}
                <div>
                    <p className='text-gray-400 uppercase font-button text-2xl'>Banner Image</p>
                        <div className='flex flex-col my-4 gap-4 py-4 pb-6 px-6 justify-between items-start border-[1px] border-gray-200 '>
                            {errors.banner?.url && (
                                <p className="error-message">{errors.banner.url.message}</p>
                            )}
                            {errors.banner?.alt && (
                                <p className="error-message">{errors.banner.alt.message}</p>
                            )}
                            <input
                                {...register('banner.url')}
                                placeholder='https://'
                                className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
                            />
                            <input
                                {...register('banner.alt')}
                                placeholder='Image alt text'
                                className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
                            />
                        </div> 
                </div>           
                {/* Avatar */}
                <div>
                    <p className='text-gray-400 uppercase font-button text-2xl'>Avatar</p>
                        <div className='flex flex-col my-4 gap-4 py-4 pb-6 px-6 justify-between items-start border-[1px] border-gray-200 '>
                            {errors.avatar?.url && (
                                <p className="error-message">{errors.avatar.url.message}</p>
                            )}
                            {errors.avatar?.alt && (
                                <p className="error-message">{errors.avatar.alt.message}</p>
                            )}
                            <input
                                {...register('avatar.url')}
                                placeholder='https://'
                                className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
                            />
                            <input
                                {...register('avatar.alt')}
                                placeholder='Image alt text'
                                className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
                            />
                        </div>
                    </div> 
                <button
                type="submit"
                className="btn-l btn-primary disabled:bg-gray-100 disabled:text-gray-400"
                disabled={isSubmitting}
                >
                {' '}
                {isSubmitting ? 'Updating profile...' : 'Update Profile'}
                </button>
            </form>
        </>
    )
}

export default EditProfileForm;