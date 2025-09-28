import { useEffect, useState } from 'react';

function UserToggle({ register, setValue }) {
  const [selectedRole, setSelectedRole] = useState('customer');

  useEffect(() => {
    setValue('venueManager', selectedRole === 'manager');
  }, [selectedRole, setValue]);

  return (
    <div className="flex gap-2 p-1 justify-center w-full h-full border-[1px] border-dark outline-[1px] outline-dark">
      <button
        type="button"
        value={false}
        onClick={() => setSelectedRole('customer')}
        className={`btn-l border-[3px] px-6 py-4 w-full h-full text-2xl ${
          selectedRole === 'customer'
            ? 'bg-light text-dark cursor-pointer'
            : 'bg-brown-100 text-brown-300 cursor-pointer'
        }`}
      >
        Customer
      </button>
      <button
        type="button"
        value={true}
        onClick={() => setSelectedRole('manager')}
        className={`btn-l px-6 border-[3px] py-4 w-full h-full text-2xl ${
          selectedRole === 'manager'
            ? 'bg-light text-dark cursor-pointer'
            : 'bg-brown-100 text-brown-300 cursor-pointer'
        }`}
      >
        Venue Manager
      </button>
      <input
        type="hidden"
        {...register('venueManager')}
        value={selectedRole === 'manager'}
      ></input>
    </div>
  );
}

export default UserToggle;
