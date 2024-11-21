import { useNavigate } from "react-router-dom";
import defaultCertThumb from "../../assets/images/Certification/defaultCertThumb.png";
import { cardCertificate } from "../../models/certificate";
import { isValidImageUrl } from "../../utils/validImageUrl";

const CertificateCard = (props: cardCertificate) => {
  const navigate = useNavigate();
  
  return (
    <div
      onClick={() => navigate("/certificate/" + props.certId)}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={isValidImageUrl(props.certImage, defaultCertThumb)}
          alt={props.certName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition duration-300">
          {props.certName}
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {props.organizeName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {props.certValidity || "Permanent certificate"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
