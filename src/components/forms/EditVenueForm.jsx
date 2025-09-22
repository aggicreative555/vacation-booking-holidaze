import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { venueSchema } from '../../schema/venueSchema';
import { showToast } from '../../utils/toast';
import { toast } from 'react-toastify';
import { apiClient } from '../../utils/apiClient';
import { useEffect } from 'react';
import { useVenueStore } from '../../stores/useVenueStore';

function EditVenueForm({ venue, onClose }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(venueSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: venue,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'media',
  });

  const { updateVenue } = useVenueStore.getState();

  useEffect(() => {
    if (venue) {
      reset({
          ...venue,
          meta: {
          wifi: !!venue?.meta?.wifi ||  false,
          parking: !!venue?.meta?.parking || false,
          breakfast: !!venue?.meta?.breakfast || false,
          pets: !!venue?.meta?.pets || false,
        },
      })

    }
  }, [venue, reset]);

  const onSubmit = async (data) => {
    const toastId = showToast.loading('Updating Venue...');

    try {
      const response = await apiClient(
        `/holidaze/venues/${venue.id}`,
        {
          method: 'PUT',
          body: data,
        },
        true,
        true
      );

      updateVenue(response?.data ?? response)

      await new Promise((res) => setTimeout(res, 1500));
      toast.dismiss(toastId);

      await new Promise((res) => setTimeout(res, 2000));
      showToast.venueUpdated();
      if (onClose) onClose();
      await new Promise((res) => setTimeout(res, 1500));
    } catch (error) {
      console.error('Error updating venue:', error);
      const apiMessage = error?.data?.errors?.[0]?.message || error.message ;
      const errorMessage =
        `${apiMessage}. Please try again.` ||
        'Something went wrong when updating your venue. Please try again later.';
      showToast.error(errorMessage);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <h1 className="uppercase font-garamond w-full text-center break-word max-w-[400px] md:max-w-[450px] mb-4 mt-8 text-red-800 text-3xl md:text-5xl">
        Edit your venue
      </h1>
      <span className="h-[1px] w-2/4 bg-black m-[1px]"></span>
      <span className="h-[1px] w-2/4 bg-black m-[1px]"></span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-6 md:w-96 mt-10 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <label className="label-base group">
          Venue name
          <input
            type="text"
            {...register('name')}
            className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </label>
        <label className="label-base group">
          Description
          <input
            type="text"
            {...register('description')}
            className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
          />
          {errors.description && (
            <p className="error-message">{errors.description.message}</p>
          )}
        </label>
        <label className="label-base group">
          Price
          <input
            type="number"
            {...register('price')}
            className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
          />
          {errors.price && (
            <p className="error-message">{errors.price.message}</p>
          )}
        </label>
        <label className="label-base group">
          Max guests
          <input
            type="number"
            {...register('maxGuests')}
            className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
          />
          {errors.maxGuests && (
            <p className="error-message">{errors.maxGuests.message}</p>
          )}
        </label>
        {/* Image */}
        <div>
          <p className="text-gray-400 uppercase font-button text-2xl">Images</p>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col my-4 gap-4 py-4 pb-6 px-6 justify-between items-start border-[1px] border-gray-200 "
            >
              {errors.media?.[index]?.url && (
                <p className="error-message">
                  {errors.media[index].url.message}
                </p>
              )}
              {errors.media?.[index]?.alt && (
                <p className="error-message">
                  {errors.media[index].alt.message}
                </p>
              )}
              <input
                {...register(`media.${index}.url`)}
                placeholder="https://"
                className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
              />
              <input
                {...register(`media.${index}.alt`)}
                placeholder="Image alt text"
                className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn-s btn-secondary"
              >
                Remove image
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ url: '', alt: '' })}
            className="btn-s btn-primary"
          >
            Add image
          </button>
        </div>
        {/* Amenities */}
        <div className="flex flex-wrap flex-col gap-4 font-button uppercase my-6 checked:bg-black">
          {['wifi', 'parking', 'breakfast', 'pets'].map((amenity) => (
            <label key={amenity} className="flex gap-2 items-center">
                <Controller
                  name={`meta.${amenity}`}
                  control={control}
                  render={({ field }) => (
                    <input 
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              {amenity}
            </label>
          ))}
        </div>
        {/* Location */}
        <div className="flex flex-col gap-6">
          <p className="text-gray-400 uppercase font-button text-2xl">
            Location
          </p>
          <label className="label-base group">
            Continent
            <input
              placeholder="Europe"
              {...register('location.continent')}
              className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
            />
            {errors.continent && (
              <p className="error-message">{errors.continent.message}</p>
            )}
          </label>
          <label className="label-base group">
            Country
            <input
              placeholder="Norway"
              {...register('location.country')}
              className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
            />
            {errors.country && (
              <p className="error-message">{errors.country.message}</p>
            )}
          </label>
          <label className="label-base group">
            City
            <input
              placeholder="Bergen"
              {...register('location.city')}
              className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
            />
            {errors.city && (
              <p className="error-message">{errors.city.message}</p>
            )}
          </label>
          <label className="label-base group">
            Address
            <input
              placeholder="Whimsical street 5/4"
              {...register('location.address')}
              className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
            />
            {errors.address && (
              <p className="error-message">{errors.address.message}</p>
            )}
          </label>
          <label className="label-base group">
            Zip Code
            <input
              placeholder="4550"
              {...register('location.zip')}
              className="input-base border-b-[1px] hover:border-black hover:border-b-[2px] transition-all duration-200 ease-in-out focus:border-black focus:border focus:rounded-none focus:outline-1 focus:outline-offset-1 focus:outline-black"
            />
            {errors.zip && (
              <p className="error-message">{errors.zip.message}</p>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="btn-l btn-primary disabled:bg-gray-100 disabled:text-gray-400"
          disabled={isSubmitting}
        >
          {' '}
          {isSubmitting ? 'Updating venue...' : 'Update Venue'}
        </button>
      </form>
    </>
  );
}

export default EditVenueForm;
