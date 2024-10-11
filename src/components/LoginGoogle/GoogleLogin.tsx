import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    fetch(
      "https://certificateinformationportal.azurewebsites.net/google/login-google",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok) {
          navigate("/");
        } else {
          console.error("Đăng nhập thất bại:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Đăng nhập bằng Google</button>
    </div>
  );
};

export default GoogleLogin;
