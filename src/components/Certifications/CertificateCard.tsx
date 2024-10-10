import defaultCertThumb from '../../assets/images/Certification/defaultCertThumb.png'
interface CertificateCardProps {
  title: string;
  organization: string;
  expiration: string;
  image?:string
}

// Certificate card component
const CertificateCard: React.FC<CertificateCardProps> = ({ title, organization, expiration, image }) => {
  return (
    <div className="border rounded-xl shadow-md p-4 bg-white w-80 m-auto min-h-96
     cursor-pointer ease-in-out duration-300 hover:bg-gray-200 hover:scale-105">
      {/* <div className="h-24 bg-gray-200 mb-4"></div> */}
      <img src={image ? image : defaultCertThumb} alt="" className="w-full h-1/3 object-cover mb-4 rounded-xl"/>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">Organization: {organization}</p>
      <p className="text-sm text-gray-600">{expiration}</p>
    </div>
  );
};

export default CertificateCard;