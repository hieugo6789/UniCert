import CustomButton from "../../components/UI/CustomButton";

const Login = () => {
  const handleLogin = () => {
    console.log("login");
  };
  return (
    <div>
      <CustomButton
        width="w-64"
        label="Login"
        onClick={handleLogin}
      />
      Test
    </div>
  );
};
export default Login;
