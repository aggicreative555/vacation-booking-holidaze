import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { venueSchema } from '../../schema/venueSchema';
import { showToast } from '../../utils/toast';
import { toast } from 'react-toastify';
import { apiClient } from '../../utils/apiClient';
import { useEffect } from 'react';
import { useVenueStore } from '../../stores/useVenueStore';
import { Trash2 } from 'lucide-react';

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
          wifi: !!venue?.meta?.wifi || false,
          parking: !!venue?.meta?.parking || false,
          breakfast: !!venue?.meta?.breakfast || false,
          pets: !!venue?.meta?.pets || false,
        },
      });
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

      updateVenue(response?.data ?? response);

      await new Promise((res) => setTimeout(res, 1500));
      toast.dismiss(toastId);

      await new Promise((res) => setTimeout(res, 2000));
      showToast.venueUpdated();
      if (onClose) onClose();
      await new Promise((res) => setTimeout(res, 1500));
    } catch (error) {
      console.error('Error updating venue:', error);
      const apiMessage = error?.data?.errors?.[0]?.message || error.message;
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
      <div className="flex flex-col justify-center items-center my-8 mx-4">
        <h1
          className="text-4xl uppercase font-chonburi
        w-full text-center break-word max-w-[400px] md:max-w-[450px] text-crimson"
        >
          Update venue
        </h1>
        <span className="mt-4 h-[1px] w-1/2 bg-brown-200"></span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-6 md:w-[500px] mt-10 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <label className="label-base group">
          Venue name
          <input
            type="text"
            {...register('name')}
            className="input-base text-left text-dark font-normal"
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
            className="input-base text-left font-normal text-dark"
          />
          {errors.description && (
            <p className="error-message">{errors.description.message}</p>
          )}
        </label>
        <div className="flex flex-row gap-12">
          <label className="label-base group relative">
            Price
            <input
              type="number"
              {...register('price')}
              className="input-base text-left font-normal text-dark"
            />
            <span className="absolute right-3 bottom-1/5 -translate-y-1/2 text-brown-200 font-normal text-lg">
              NOK
            </span>
            {errors.price && (
              <p className="error-message">{errors.price.message}</p>
            )}
          </label>
          <label className="label-base group ">
            Max guests
            <input
              type="number"
              {...register('maxGuests')}
              className="input-base text-left font-normal text-dark "
            />
            {errors.maxGuests && (
              <p className="error-message">{errors.maxGuests.message}</p>
            )}
          </label>
        </div>
        {/* Image */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl uppercase text-brown-400 font-garamond tracking-wide pt-4 pb-2 text-left w-full">
            Location
          </p>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border-1 border-brown-200 px-6 py-8 w-full"
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
                className="input-base text-left font-normal text-dark"
              />
              <input
                {...register(`media.${index}.alt`)}
                placeholder="Image alt text"
                className="input-base text-left font-normal text-dark"
              />
              <button
                type="button"
                title="Remove image"
                disabled={fields.length <= 1}
                onClick={() => remove(index)}
                className={`place-self-end btn-s p-2 mx-4 rounded-full border-brown-300 text-brown-300 mt-8 ${fields.length <= 1 ? 'opacity-50 cursor-not-allowed' : 'text-brown-300'}`}
              >
                <Trash2 />
              </button>
            </div>
          ))}
          <button
            type="button"
            disabled={fields.length >= 3}
            onClick={() => append({ url: '', alt: '' })}
            className={`mt-8 btn-s rounded-full border-lamp bg-lamp text-light md:w-[208px]${fields.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Add image
          </button>
        </div>
        {/* Amenities */}
        <div className="flex flex-col justify-center items-start">
          <p className="text-2xl uppercase text-brown-400 font-garamond tracking-wide pt-4 pb-2 text-left w-full">
            Amenities
          </p>
          <div className="border-1 border-brown-200 px-6 py-8 w-full">
            <div className="flex flex-wrap flex-col gap-4 font- uppercase checked:bg-brown-300">
              {['wifi', 'parking', 'breakfast', 'pets'].map((amenity) => (
                <Controller
                  name={`meta.${amenity}`}
                  control={control}
                  render={({ field }) => (
                    <label
                      key={amenity}
                      className={`flex flex-row gap-2 text-base font-garamond uppercase w-full mt-2 ${field?.value ? 'text-black-400' : 'text-brown-200'}`}
                    >
                      <input
                        type="checkbox"
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      {amenity}
                    </label>
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Location */}
        <div className="flex flex-col justify-center items-start">
          <p className="text-2xl uppercase text-brown-400 font-garamond tracking-wide pt-4 pb-2 text-left w-full">
            location
          </p>
          <div className="border-1 border-brown-200 px-6 py-8 w-full">
            <label className="label-base group">
              Continent
              <input
                placeholder="Europe"
                {...register('location.continent')}
                className="input-base input-base text-left font-normal text-dark"
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
                className="input-base input-base text-left font-normal text-dark"
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
                className="input-base input-base text-left font-normal text-dark"
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
                className="input-base input-base text-left font-normal text-dark"
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
                className="input-base text-left font-normal text-dark"
              />
              {errors.zip && (
                <p className="error-message">{errors.zip.message}</p>
              )}
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="btn-l btn-primary disabled:bg-brown-100 disabled:text-brown-200"
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
