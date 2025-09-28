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
      bio: user?.bio ?? '',
      avatar: {
        url: user?.avatar?.url || '',
        alt: user?.avatar?.alt ?? 'User avatar picture',
      },
      banner: {
        url: user?.banner?.url || '',
        alt: user?.banner?.alt ?? 'User banner picture',
      },
    },
  });

  const { updateUser } = useAuthStore();

  const onSubmit = async (data) => {
    const toastId = showToast.loading('Updating Profile...');
    try {
      const updatedUser = await apiClient(
        `/holidaze/profiles/${user?.name}`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
        },
        true,
        true
      );

      updateUser(updatedUser.data);

      await new Promise((res) => setTimeout(res, 1500));
      toast.dismiss(toastId);

      await new Promise((res) => setTimeout(res, 2000));
      showToast.profileUpdated();
      if (onClose) onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      const apiMessage =
        error?.data?.errors?.[0]?.message || error?.errors?.[0]?.message;
      const errorMessage =
        `${apiMessage}. Please try again.` ||
        'Something went wrong when updating your profile. Please try again later.';
      showToast.error(errorMessage);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center my-8 mx-4">
        <h1
          className="text-4xl uppercase font-chonburi
          w-full text-center break-word max-w-[400px] md:max-w-[450px] text-crimson"
        >
          Update profile
        </h1>
        <span className="mt-4 h-[1px] w-1/2 bg-brown-200"></span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-6 md:w-[500px] mt-10 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <label className="label-base group ">
          My Bio
          <input
            type="text"
            {...register('bio')}
            className="input-base text-left text-dark font-normal"
          />
          {errors.bio && <p className="error-message">{errors.bio.message}</p>}
        </label>
        {/* Banner */}
        <div>
          <div className="flex flex-col justify-center items-start">
            <p className="text-2xl uppercase text-brown-400 font-garamond tracking-wide pt-4 pb-2 text-left w-full">
              banner image
            </p>
            <div className="border-1 border-brown-200 px-6 py-8 w-full">
              {errors.banner?.url && (
                <p className="error-message">{errors.banner.url.message}</p>
              )}
              {errors.banner?.alt && (
                <p className="error-message">{errors.banner.alt.message}</p>
              )}
              <input
                {...register('banner.url')}
                placeholder="https://"
                className="input-base text-left text-dark font-normal"
              />
              <input
                {...register('banner.alt')}
                placeholder="Image alt text"
                className="input-base text-left text-dark font-normal"
              />
            </div>
          </div>
        </div>
        {/* Avatar */}
        <div className="flex flex-col justify-center items-start">
          <p className="text-2xl uppercase text-brown-400 font-garamond tracking-wide pt-4 pb-2 text-left w-full">
            avatar image
          </p>
          <div className="border-1 border-brown-200 px-6 py-8 w-full">
            {errors.avatar?.url && (
              <p className="error-message">{errors.avatar.url.message}</p>
            )}
            {errors.avatar?.alt && (
              <p className="error-message">{errors.avatar.alt.message}</p>
            )}
            <input
              {...register('avatar.url')}
              placeholder="https://"
              className="input-base text-left text-dark font-normal"
            />
            <input
              {...register('avatar.alt')}
              placeholder="Image alt text"
              className="input-base text-left text-dark font-normal"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-12 btn-l btn-primary font-normal disabled:bg-brown-100 disabled:text-brown-200"
          disabled={isSubmitting}
        >
          {' '}
          {isSubmitting ? 'Updating profile...' : 'Update Profile'}
        </button>
      </form>
    </>
  );
}

export default EditProfileForm;
