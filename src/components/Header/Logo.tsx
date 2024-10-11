import { Link } from "react-router-dom";
import logo from "../../assets/images/UniCertLogo.png";

const Logo = () => {
  return (
    <Link to="./">
      <img
        src={logo}
        alt="Logo"
        className="w-14 h-14"
      />
    </Link>
  );
};
export default Logo;
