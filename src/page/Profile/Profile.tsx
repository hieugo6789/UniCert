import React, { useState } from 'react';
import CustomModal from '../../components/UI/CustomModal';
import CustomInput from '../../components/UI/CustomInput';
import CustomButton from '../../components/UI/CustomButton';
import DefaultAvatar from '../../assets/images/Avatar/DefaultAvatar.jpg';
import { Avatar } from 'antd';
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

  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const handleChangePassword = () => {
    setIsOpenPasswordModal(!isOpenPasswordModal);
  }
  const handleSavePassword = () => {
    handleChangePassword();
    console.log('Save password');
  }
  const [isOpenPaymentMethodsModal, setIsOpenPaymentMethodsModal] = useState(false);
  const handlePaymentMethods = () => {
    setIsOpenPaymentMethodsModal(!isOpenPaymentMethodsModal);
  }
  const handleSavePaymentMethods = () => {
    handlePaymentMethods();
    console.log('Save payment methods');
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left panel */}
      <div className="w-1/4 bg-white shadow-md p-4">
        <div className="flex flex-col items-center mb-6">
          {/* <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div> */}
          <img src={DefaultAvatar} alt="avatar" className="w-24 h-24 bg-gray-300 rounded-full mb-4"/>
          <p className="font-bold text-lg">Minh NT</p>
        </div>
        <ul className="space-y-4">
          <li className="text-purple-600 font-semibold cursor-pointer text-center">Profile</li>
          <li className="text-gray-600 cursor-pointer hover:text-purple-500 text-center" onClick={handleChangePassword}>Change password</li>
          <li className="text-gray-600 cursor-pointer hover:text-purple-500 text-center" onClick={handlePaymentMethods}>Payments methods</li>
        </ul>
      </div>

      <div className="w-3/4 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold text-center ">Public profile</h2>
        <p className='mb-6 text-center'>Add information about yourself</p>
        <div className="border-t border-gray-300 my-6"></div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 px-4 py-2">
            <label className="block font-medium text-gray-700 mb-1">UserName</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
            />
          </div>

          <div className="mb-4 px-4 py-2">
            <label className="block font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
            />
          </div>

          <div className="mb-4 px-4 py-2">
            <label className="block font-medium text-gray-700 mb-1">Date of birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
            />
          </div>

          <div className="mb-4 px-4 py-2">
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
      {/* changePassword */}
      <CustomModal
        isOpen={isOpenPasswordModal}
        onClose={handleChangePassword}
        title="Change password"
      >
        <form>
          <CustomInput placeholder="Old password" type="password" required />
          <CustomInput placeholder="New password" type="password" required />
          <div className='flex justify-end'>
            <CustomButton type="submit" label="Save" onClick={handleSavePassword} />
          </div>
        </form>
      </CustomModal>
      {/* Payment method */}
      <CustomModal
        isOpen={isOpenPaymentMethodsModal}
        onClose={handlePaymentMethods}
        title="Payment methods"
      >
        <form>
          <CustomInput placeholder="Card number" type="text" required />
          <CustomInput placeholder="Card holder" type="text" required />
          <CustomInput placeholder="Expiration date" type="text" required />
          <CustomInput placeholder="CVV" type="text" required />
          <div className='flex justify-end'>
            <CustomButton type="submit" label="Save" onClick={handleSavePaymentMethods} />
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default Profile;
