import { useNavigate } from "react-router-dom";
import defaultCertThumb from "../../assets/images/Certification/defaultCertThumb.png";
import { cardCertificate } from "../../models/certificate";
import { isValidImageUrl } from "../../utils/validImageUrl";

const CertificateCard = (props: cardCertificate) => {
  const navigate = useNavigate();
  return (
    <div
      className="border rounded-xl shadow-md p-4 bg-white w-80 m-auto
      cursor-pointer ease-in-out duration-300 hover:bg-gray-200 hover:scale-105"
      onClick={() => navigate("/certificate/" + props.certId)}
    >
      <img
        src={isValidImageUrl(props.certImage, defaultCertThumb)}
        alt=""
        className="w-full h-64 object-cover mb-4 rounded-xl"
      />
      <h3 className="text-lg font-semibold mb-3 line-clamp-2 h-[3.2rem]">{props.certName}</h3>
      <p className="text-sm text-gray-600 mb-2">Organization: {props.organizeName}</p>
      <p className="text-sm text-gray-600">
        Certificate Validity:{" "}                        
        {props && props.certValidity
          ? props.certValidity
          : "This is a permanent certificate"}
      </p>
    </div>
  );
};

export default CertificateCard;
