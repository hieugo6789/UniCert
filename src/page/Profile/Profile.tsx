import React, { useState } from 'react';

interface ProfileForm {
  username: string;
  phone: string;
  dob: string;
  address: string;
}

const Profile = () => {
  const [form, setForm] = useState<ProfileForm>({
    username: 'Minh',
    phone: '0793552216',
    dob: '01/01/2006',
    address: 'Khu 2 hoàng cương thanh ba phú thọ',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', form);
    // Add logic to save form data
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left panel */}
      <div className="w-1/4 bg-white shadow-md p-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
          <p className="font-bold text-lg">Minh NT</p>
        </div>
        <ul className="space-y-4">
          <li className="text-purple-600 font-semibold cursor-pointer text-center">Profile</li>
          <li className="text-gray-600 cursor-pointer hover:text-purple-500 text-center">Change password</li>
          <li className="text-gray-600 cursor-pointer hover:text-purple-500 text-center">Payments methods</li>
        </ul>
      </div>

      {/* Center panel */}
      <div className="w-3/4 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold text-center ">Public profile</h2>
        <p className='mb-6 text-center'>Add information about yourself</p>
        {/* line */}
        <div className="border-t border-gray-300 my-6"></div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">UserName</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Date of birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
