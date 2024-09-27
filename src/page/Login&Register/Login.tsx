import CustomButton from "../../components/UI/CustomButton";
import image from "../../assets/images/login.png";
import CustomInput from "../../components/UI/CustomInput";
import { Link } from "react-router-dom";
const Login = () => {
  const handleLogin = () => {
    console.log("login");
  };
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex-1 flex justify-center items-center">
        <img
          src={image}
          alt="Image"
          className="w-1/2"
        />
      </div>
      <div className="flex-1">
        <div className="max-w-sm mx-auto  p-8 ">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form>
            <CustomInput
              type="text"
              placeholder="Username"
              width="w-full"
              height="px-4 py-2"
            />

            <CustomInput
              type="password"
              placeholder="Password"
              width="w-full"
              height="px-4 py-2"
            />

            <CustomButton
              label="Login"
              onClick={handleLogin}
              width="w-full"
              height="py-2"
            />
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Or{" "}
            <a
              href="/login"
              className="text-purple-600 font-bold hover:underline"
            >
              Forgot password?
            </a>
          </p>
          <div className="mt-4 flex-1 h-0.5 bg-gray-300"></div>

          <p className="text-center text-sm text-gray-500 mt-4 bg-gray-100 w-full p-2.5 rounded-xl">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-600 font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
