import { Link } from "react-router-dom";
import logoDark from "../../assets/images/LogoHeader.png";
import logoLight from "../../assets/images/UniCertLogo.png";

const Logo = () => {

  return (
    <Link to="./">
      <img
        src={logoLight} 
        alt="Logo"
        className="h-14 block dark:hidden"
      />
      <img
        src={logoDark}
        alt="Logo"
        className="h-14 hidden dark:block"
      />
    </Link>
  );
};

export default Logo;