import { useNavigate } from 'react-router-dom';
import defaultCertThumb from '../../assets/images/Certification/defaultCertThumb.png'
import { allCertificationData } from '../../models/certificate';

const CertificateCard = (props:allCertificationData) => {
  const navigate = useNavigate();
  const date = new Date(props.expiryDate);
  return (
    <div className="border rounded-xl shadow-md p-4 bg-white w-80 m-auto min-h-96
     cursor-pointer ease-in-out duration-300 hover:bg-gray-200 hover:scale-105"
     onClick={()=>navigate("/certificate/"+props.certId)}>
      <img src={props.certImage ? props.certImage : defaultCertThumb} alt="" className="w-full h-1/3 object-cover mb-4 rounded-xl"/>
      <h3 className="text-lg font-semibold">{props.certName}</h3>
      <p className="text-sm text-gray-600">Organization: {props.certId}</p>
      <p className="text-sm text-gray-600">Expiry Date: {date.toLocaleDateString()}</p>
    </div>
  );
};

export default CertificateCard;
