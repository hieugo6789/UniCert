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
import { useChangePassword } from "../../hooks/Password/useChangePassword";
import { showToast } from "../../utils/toastUtils";
import bronze from "../../assets/userLevel/bronze.png";
import silver from "../../assets/userLevel/silver.png";
import gold from "../../assets/userLevel/star.png";
import diamond from "../../assets/userLevel/diamond.png";
import agent from "../../utils/agent";

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
    userLevel: "bronze",
    userImage: "string",
    userOffenseCount: 0,
  });
  
  const navigate = useNavigate();
  const { state, getProfileDetails, updateProfile } = useProfile();

  useEffect(() => {     
    const userId = Cookies.get("userId");
    if (!userId) {
      navigate("/login");
      return;
    }
    getProfileDetails(userId);      
  }, [navigate]);

  useEffect(() => {
    if (state.profile) {
      setForm({
        ...form,
        ...state.profile,
        userImage: state.profile.userImage || DefaultAvatar,
      });
    }
  }, [state.profile]);

  const [isEditing, setIsEditing] = useState(false);

  const initialValues: UserDetail = form;

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username cannot exceed 20 characters"),
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
    address: Yup.string()
      .required("Address is required"),
    dob: Yup.date()
      .max(new Date(), "Date of birth cannot be in the future")
      .required("Date of birth is required"),
  });

  const handleSubmit = async (values: UserDetail) => {
    console.log("Submitted data:", values);
    setIsEditing(false);
    updateProfile(values);
    setForm(values);
  };

  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChangePassword = () => {
    setIsOpenPasswordModal(!isOpenPasswordModal);
    setPasswordErrors({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const validatePassword = (name: string, value: string) => {
    let error = '';
    
    if (name === 'newPassword') {
      if (value.length < 8) {
        error = 'Password must be at least 8 characters long';
      } else if (value === passwordForm.oldPassword) {
        error = 'New password must be different from old password';
      }
    }

    if (name === 'confirmPassword') {
      if (value !== passwordForm.newPassword) {
        error = 'Passwords do not match';
      }
    }

    return error;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validatePassword(name, value);
    setPasswordErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };
  
  const {state:changePaswordState, changePassword} = useChangePassword();
  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for any existing errors
    if (Object.values(passwordErrors).some(error => error !== '')) {
      return;
    }

    const handleChangePassword = async () => {
      await changePassword(passwordForm, Cookies.get("userId") || "");
    }
    handleChangePassword();
  };

  useEffect(() => {
    if (changePaswordState.currentInput) {
      // reset form
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      showToast("Password changed successfully", "success");
      setIsOpenPasswordModal(false);
    }
  }, [changePaswordState.currentInput]);

  // error
  useEffect(() => {
    if (changePaswordState.error) {
      showToast("Change password failed", "error");
    }
  }, [changePaswordState.error]);

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

  useEffect(() => {    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [totalPoints, setTotalPoints] = useState<number>(0);
  const userId = Cookies.get("userId");
  
  useEffect(() => {
    const fetchUserPayment = async () => {
      try {
        const response = await agent.Payment.userPayment(userId || "");
        console.log("Test", response)
        setTotalPoints(response.data.totalPaymentPoints);
      } catch (error) {
        console.error("Error fetching user payment:", error);
      }
    };
    if (userId) {
      fetchUserPayment();
    }
  }, [userId]);

  const getRankInfo = () => {
    if (totalPoints >= 500) return { rank: "Diamond", color: "text-blue-500", progress: 100 };
    if (totalPoints >= 300) return { rank: "Gold", color: "text-yellow-500", progress: (totalPoints - 300) / 2 };
    if (totalPoints >= 100) return { rank: "Silver", color: "text-gray-400", progress: totalPoints - 100 };
    return { rank: "Bronze", color: "text-orange-500", progress: totalPoints };
  };

  // For the Field component's render prop
  interface FieldRenderProps {
    field: {
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
    form: {
      setFieldValue: (field: string, value: string | null) => void;
    };
  }

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex">
      <div className="flex flex-col lg:flex-row max-w-7xl w-full mx-auto my-auto py-4 lg:py-8 px-4 gap-4 lg:gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">          
          {/* Profile card */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 lg:p-6">
            <div className="flex flex-col items-center mb-6 lg:mb-8">
              <div className="relative group">
                <img
                  src={form.userImage ? form.userImage : DefaultAvatar}
                  alt="avatar"
                  className="w-24 lg:w-32 h-24 lg:h-32 rounded-full object-cover border-4 border-purple-200 
                    shadow-lg cursor-pointer hover:border-purple-300 transition-all dark:border-purple-700"
                  onClick={() => setIsOpenAvatarModal(true)}
                />
              </div>
              <p className="font-bold text-lg lg:text-xl mt-4 text-gray-800 dark:text-gray-200">{form.fullname}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm break-all text-center">{form.email}</p>
              
              {/* Points Progress Section */}
              
            </div>

            <nav className="space-y-3">
              <div className="bg-purple-50 dark:bg-purple-900 rounded-xl p-3">
                <p className="text-purple-600 dark:text-purple-300 font-semibold text-center">Profile</p>
              </div>
              <div 
                className="hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl p-3 cursor-pointer transition-colors"
                onClick={handleChangePassword}
              >
                <p className="text-gray-600 dark:text-gray-300 text-center hover:text-purple-600 dark:hover:text-purple-400">Change Password</p>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 lg:p-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-200">Public Profile</h2>
            <p className="text-gray-500 dark:text-gray-400">Manage your profile information</p>
            </div>
            <div>
                {form.userLevel === 'Gold' && (
                <img src={gold} alt="Gold Level" className="size-14" />
                  )}
                {form.userLevel === 'Bronze' && (
                      <img src={bronze} alt="Bronze Level" className="size-14" />
                )}
                {form.userLevel === 'Silver' && (
                      <img src={silver} alt="Silver Level" className="size-14" />
                )}
                {form.userLevel === 'Diamond' && (
                      <img src={diamond} alt="Diamond Level" className="size-14" />
                )}
              </div>
          </div>

          <Formik
            initialValues={form || initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {!isEditing && (
                  <div className="flex justify-end mb-4">
                    <button
                      type="button"
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium flex items-center gap-2"
                      onClick={() => setIsEditing(true)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </button>
                  </div>
                )}

                <div className="space-y-4 lg:space-y-6">
                  {/* Form fields grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {/* Username field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Username
                      </label>
                      <Field
                        name="username"
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          !isEditing 
                            ? 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400' 
                            : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-300'
                        }`}
                        disabled={!isEditing}
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="mt-1 text-sm text-red-500 dark:text-red-400"
                      />
                    </div>

                    {/* Full Name field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <Field
                        name="fullname"
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          !isEditing 
                            ? 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400' 
                            : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-300'
                        }`}
                        disabled={!isEditing}
                      />
                      <ErrorMessage
                        name="fullname"
                        component="div"
                        className="mt-1 text-sm text-red-500 dark:text-red-400"
                      />
                    </div>

                    {/* Date of Birth field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date of Birth
                      </label>
                      <Field name="dob">
                        {({ field, form }: FieldRenderProps) => {
                          const formatDateToInput = (date: string | null) => {
                            if (!date) return '';
                            try {
                              const d = new Date(date);
                              if (isNaN(d.getTime())) return '';
                              return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
                            } catch {
                              return '';
                            }
                          };

                          const parseInputToDate = (dateStr: string) => {
                            if (!dateStr) return null;
                            const [day, month, year] = dateStr.split('/');
                            if (!day || !month || !year) return null;
                            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                          };

                          return (
                            <input
                              type="text"
                              {...field}
                              value={field.value ? formatDateToInput(field.value) : ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                                  form.setFieldValue('dob', parseInputToDate(value));
                                } else {
                                  form.setFieldValue('dob', value); // Giữ lại giá trị người dùng nhập nếu không hợp lệ
                                }
                              }}
                              placeholder="dd/mm/yyyy"
                              className={`w-full px-4 py-2 rounded-lg border ${
                                !isEditing
                                  ? 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                  : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-300'
                              }`}
                              disabled={!isEditing}
                            />
                          );
                        }}
                      </Field>
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="mt-1 text-sm text-red-500 dark:text-red-400"
                      />
                    </div>

                    {/* Email field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          !isEditing 
                            ? 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400' 
                            : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-300'
                        }`}
                        disabled={!isEditing}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="mt-1 text-sm text-red-500 dark:text-red-400"
                      />
                    </div>

                    {/* Phone Number field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <Field
                        name="phoneNumber"
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          !isEditing 
                            ? 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400' 
                            : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-300'
                        }`}
                        disabled={!isEditing}
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="mt-1 text-sm text-red-500 dark:text-red-400"
                      />
                    </div>

                    {/* Address field - spans full width */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <Field
                        name="address"
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          !isEditing 
                            ? 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400' 
                            : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-300'
                        }`}
                        disabled={!isEditing}
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="mt-1 text-sm text-red-500 dark:text-red-400"
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-center mt-6 lg:mt-8">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 bg-purple-600 dark:bg-purple-700 text-white rounded-lg
                        hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors focus:outline-none 
                        focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
          <div className="mt-6 w-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Points Progress</span>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">{totalPoints}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">points</span>
                  </div>
                </div>

                {/* Rank Progress Bar */}
                <div className="relative">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                      style={{ width: `${Math.min(100, (totalPoints / 500) * 100)}%` }}
                    />
                  </div>
                  
                  {/* Rank Markers */}
                  <div className="flex justify-between mt-2">
                    <div className="flex flex-col items-center">
                      <img src={bronze} alt="Bronze" className="w-8 h-8" />
                      <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">0</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src={silver} alt="Silver" className="w-8 h-8" />
                      <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">100</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src={gold} alt="Gold" className="w-8 h-8" />
                      <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">300</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src={diamond} alt="Diamond" className="w-8 h-8" />
                      <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">500</span>
                    </div>
                  </div>
                </div>

                {/* Current Rank Display */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {/* Current Rank Card */}
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Current Rank</span>
                    <div className="flex items-center gap-3 mt-2">
                      <img 
                        src={
                          totalPoints >= 500 ? diamond :
                          totalPoints >= 300 ? gold :
                          totalPoints >= 100 ? silver :
                          bronze
                        } 
                        alt="Current Rank" 
                        className="w-8 h-8" 
                      />
                      <div>
                        <span className={`font-bold text-lg ${getRankInfo().color}`}>
                          {getRankInfo().rank}
                        </span>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {totalPoints} points earned
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Rank Card */}
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Next Rank</span>
                    {totalPoints < 500 ? (
                      <div className="flex items-center gap-3 mt-2">
                        <img 
                          src={
                            totalPoints >= 300 ? diamond :
                            totalPoints >= 100 ? gold :
                            silver
                          } 
                          alt="Next Rank" 
                          className="w-8 h-8" 
                        />
                        <div>
                          <span className={`font-bold text-lg ${
                            totalPoints >= 300 ? "text-blue-500" :
                            totalPoints >= 100 ? "text-yellow-500" :
                            "text-gray-400"
                          }`}>
                            {totalPoints >= 300 ? "Diamond" :
                             totalPoints >= 100 ? "Gold" :
                             "Silver"}
                          </span>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Need {
                              totalPoints >= 300 ? 500 - totalPoints :
                              totalPoints >= 100 ? 300 - totalPoints :
                              100 - totalPoints
                            } more points
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 mt-2">
                        <img src={diamond} alt="Max Rank" className="w-8 h-8" />
                        <div>
                          <span className="font-bold text-lg text-blue-500">Diamond</span>
                          <div className="text-sm text-green-500 dark:text-green-400">
                            Maximum Rank Achieved!
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
        </div>
      </div>
            
      <CustomModal
        isOpen={isOpenPasswordModal}
        onClose={handleChangePassword}
        title="Change password"
      >
        <form onSubmit={handleSavePassword}>
          <div>
            <CustomInput
              placeholder="Old password"
              type="password"
              required
              onChange={(e) => handlePasswordChange({...e, target: {...e.target, name: 'oldPassword'}})}
              value={passwordForm.oldPassword}
            />
            {passwordErrors.oldPassword && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{passwordErrors.oldPassword}</p>
            )}
          </div>
          <div>
            <CustomInput
              placeholder="New password"
              type="password"
              required
              onChange={(e) => handlePasswordChange({...e, target: {...e.target, name: 'newPassword'}})}
              value={passwordForm.newPassword}
            />
            {passwordErrors.newPassword && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{passwordErrors.newPassword}</p>
            )}
          </div>
          <div>
            <CustomInput
              placeholder="Confirm password"
              type="password"
              required
              onChange={(e) => handlePasswordChange({...e, target: {...e.target, name: 'confirmPassword'}})}
              value={passwordForm.confirmPassword}
            />
            {passwordErrors.confirmPassword && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{passwordErrors.confirmPassword}</p>
            )}
          </div>
          <div className="flex justify-end">
            <CustomButton
              type="submit"
              label="Save"
            />
          </div>
        </form>
      </CustomModal>

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
              className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"
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
