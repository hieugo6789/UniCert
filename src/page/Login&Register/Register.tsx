import CustomButton from "../../components/UI/CustomButton";
import CustomInput from "../../components/UI/CustomInput";
import image from "../../assets/images/login.png";
import { Link } from 'react-router-dom';
const Register = () => {
  const handleRegister = () => {
    console.log("register");
  };
  return (
    <div className="flex justify-center items-center h-screen bg-white">
 
    <div className="flex-1 flex justify-center items-center">
      <img
        src={image}
        alt="Image"
        className="w-2/3"
      />
    </div>
    <div className="flex-1">
      <div className="max-w-md mx-auto  p-8 ">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        <form>
          <CustomInput type="text" placeholder="Username" width="w-full" height="px-4 py-2"/>
          <CustomInput type="email" placeholder="Email" width="w-full" height="px-4 py-2"/>
          <CustomInput type="password" placeholder="Password" width="w-full" height="px-4 py-2"/>

          
          
          <CustomButton label="Register" onClick={handleRegister} width="w-full" height="py-2" />
        </form>

        <p className="text-center text-sm text-gray-500 mt-4 bg-gray-100 w-full p-2.5 rounded-xl">
          Already have account?{" "}
          <Link to="/login" className="text-purple-600 font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  </div>
  );
};
export default Register;
