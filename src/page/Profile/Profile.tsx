import { useEffect, useState } from "react";
import CustomModal from "../../components/UI/CustomModal";
import DefaultAvatar from "../../assets/images/Avatar/DefaultAvatar.jpg";
import useProfile from "../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import CustomInput from "../../components/UI/CustomInput";
import CustomButton from "../../components/UI/CustomButton";
import Cookies from "js-cookie";
import { UserDetail } from "../../models/user";
import axios from "axios";

const Profile = () => {
  const [form, setForm] = useState<UserDetail>({
    userId: "0",
    username: "Minh",
    password: "********",
    email: "string@gmail.com",
    fullname: "Minh NT",
    dob: new Date(),
    address: "Khu 2 hoàng cương thanh ba phú thọ",
    phoneNumber: 793552216,
    role: "Admin",
    status: true,
    userCreatedAt: new Date(),
    userImage: "string",
  });
  const { state, getProfileDetails, updateProfile } = useProfile();
  useEffect(() => {        
      getProfileDetails(Cookies.get("userId"));      
  }, []);
  useEffect(() => {
    if (state.profile) {
      setForm({
        ...form,
        ...state.profile, // Cập nhật form chỉ khi state.profile có giá trị hợp lệ
        userImage: state.profile.userImage || DefaultAvatar, // Đảm bảo luôn có giá trị cho userImage
      });
    }
  }, [state.profile]);
  // console.log("profile", form);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  const initialValues: UserDetail = form;

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name cannot exceed 50 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.number()
      .typeError("Phone number must be a valid number")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = async (values: UserDetail) => {
    console.log("Submitted data:", values);
    setIsEditing(false);
    updateProfile(values);
    setForm(values);
  };

  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const handleChangePassword = () => {
    setIsOpenPasswordModal(!isOpenPasswordModal);
  };
  const handleSavePassword = () => {
    handleChangePassword();
    console.log("Save password");
  };
  const [isOpenPaymentMethodsModal, setIsOpenPaymentMethodsModal] =
    useState(false);
  const handlePaymentMethods = () => {
    setIsOpenPaymentMethodsModal(!isOpenPaymentMethodsModal);
  };
  const handleSavePaymentMethods = () => {
    handlePaymentMethods();
    console.log("Save payment methods");
  };

  const [isOpenAvatarModal, setIsOpenAvatarModal] = useState(false);  
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null); 
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log("Selected avatar file:", file);
      setSelectedAvatar(file);
      setPreviewAvatar(URL.createObjectURL(file));      
    }
  };
  
  const handleAvatarSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => { 
    event.preventDefault();     
    if (selectedAvatar) {
      const formData = new FormData();
      formData.append("api_key", "994636724857583");
      formData.append("file", selectedAvatar);
      formData.append("upload_preset", "upload_image");
      formData.append("folder", "Avatar")

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/unicert/image/upload",
          formData
        );
        const uploadedImageUrl = response.data.secure_url;

        const updatedForm = {
          ...form,
          userImage: uploadedImageUrl,
        };        
        setForm(updatedForm);
        setPreviewAvatar(null);
        setIsOpenAvatarModal(false);
        console.log("Avatar updated successfully:", uploadedImageUrl);      
        handleSubmit(updatedForm);  
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/4 bg-white shadow-md p-4">
        <div className="flex flex-col items-center mb-6">
        <img
          src={form.userImage ? form.userImage : DefaultAvatar}
          alt="avatar"
          className="w-24 h-24 bg-gray-300 rounded-full mb-4 cursor-pointer"
          onClick={() => setIsOpenAvatarModal(true)}  // Khi bấm vào, mở modal
        />
          <p className="font-bold text-lg">{form.fullname}</p>
        </div>
        <ul className="space-y-4">
          <li className="text-purple-600 font-semibold cursor-pointer text-center">
            Profile
          </li>
          <li
            className="text-gray-600 cursor-pointer hover:text-purple-500 text-center"
            onClick={handleChangePassword}
          >
            Change password
          </li>
          <li
            className="text-gray-600 cursor-pointer hover:text-purple-500 text-center"
            onClick={handlePaymentMethods}
          >
            Payments methods
          </li>
        </ul>
      </div>

      <div className="w-3/4 bg-white shadow-md p-6">
        <div>
          <div className="relative">
            <h2 className="text-xl font-bold text-center">Public profile</h2>
            <p className="mb-6 text-center">Add information about yourself</p>
          </div>
          <div className="absolute top-10 right-2">
            {/* back */}
            <button
              className="flex flex-row bg-gray-200 opacity-80 p-2 rounded-full"
              onClick={handleBack}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <p>Back to home</p>
            </button>
          </div>
        </div>
        <div className="border-t border-gray-300 my-6"></div>

        <Formik
          initialValues={form || initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-4 px-4 py-2">
                {!isEditing ? (
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700 ml-auto"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                ) : null}
              </div>

              <div className="mb-4 px-4 py-2">
                <label className="block font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Field
                  name="fullname"
                  type="text"
                  value={values.fullname}
                  onChange={handleChange}
                  readOnly={!isEditing} // Read-only when not editing
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring ${
                    !isEditing ? "bg-gray-100" : "focus:border-purple-500"
                  }`}
                  disabled={!isEditing} // Disabled when not editing
                />
                <ErrorMessage
                  name="fullname"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4 px-4 py-2">
                <label className="block font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring ${
                    !isEditing ? "bg-gray-100" : "focus:border-purple-500"
                  }`}
                  disabled={!isEditing}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4 px-4 py-2">
                <label className="block font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <Field
                  name="phoneNumber"
                  type="text"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring ${
                    !isEditing ? "bg-gray-100" : "focus:border-purple-500"
                  }`}
                  disabled={!isEditing}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4 px-4 py-2">
                <label className="block font-medium text-gray-700 mb-1">
                  Address
                </label>
                <Field
                  name="address"
                  type="text"
                  value={values.address}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring ${
                    !isEditing ? "bg-gray-100" : "focus:border-purple-500"
                  }`}
                  disabled={!isEditing}
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {isEditing ? (
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring"
                  >
                    Save
                  </button>
                </div>
              ) : // <div className="flex justify-center">
              //   <button
              //     type="button"
              //     className="px-4 py-2 bg-gray-400 text-black rounded-md hover:bg-gray-500 focus:outline-none focus:ring"
              //     onClick={handleBack}
              //   >
              //     Back
              //   </button>
              // </div>
              null}
            </Form>
          )}
        </Formik>
      </div>

      <CustomModal
        isOpen={isOpenPasswordModal}
        onClose={handleChangePassword}
        title="Change password"
      >
        <form>
          <CustomInput
            placeholder="Old password"
            type="password"
            required
          />
          <CustomInput
            placeholder="New password"
            type="password"
            required
          />
          <div className="flex justify-end">
            <CustomButton
              type="submit"
              label="Save"
              onClick={handleSavePassword}
            />
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
          <CustomInput
            placeholder="Card number"
            type="text"
            required
          />
          <CustomInput
            placeholder="Card holder"
            type="text"
            required
          />
          <CustomInput
            placeholder="Expiration date"
            type="text"
            required
          />
          <CustomInput
            placeholder="CVV"
            type="text"
            required
          />
          <div className="flex justify-end">
            <CustomButton
              type="submit"
              label="Save"
              onClick={handleSavePaymentMethods}
            />
          </div>
        </form>
      </CustomModal>

      {/* OpenAvatarModal */}
      <CustomModal
          isOpen={isOpenAvatarModal}
          onClose={() => setIsOpenAvatarModal(false)}
          title="Change Avatar"
        >
          <form>
            <div className="flex flex-col items-center">
              <img
                src={previewAvatar || (form.userImage ? form.userImage : DefaultAvatar)}
                alt="Current Avatar"
                className="w-32 h-32 bg-gray-300 rounded-full mb-4"
              />
              <CustomInput
                placeholder="image"
                type="file"
                onChange={handleAvatarChange}                
                required
              />
            </div>
            <div className="flex justify-end">
              <CustomButton type="submit" label="Save Avatar" onClick={handleAvatarSubmit}/>
            </div>
          </form>
        </CustomModal>
    </div>
  );
};

export default Profile;
