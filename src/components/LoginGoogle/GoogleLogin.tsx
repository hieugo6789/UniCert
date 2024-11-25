import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Chuyển hướng người dùng đến API login Google của backend
    window.location.href =
      "https://certificateinformationportal.azurewebsites.net/google/login-google";
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <button onClick={handleGoogleLogin}>Đăng nhập bằng Google</button>
    </div>
  );
};

export default GoogleLogin;
