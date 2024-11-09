import { useNavigate } from "react-router-dom";
// import defaultCertThumb from "../../assets/images/Certification/defaultCertThumb.png";
import { allMajorPaginationData } from "../../models/major";

const MajorCard = (props: allMajorPaginationData) => {
  const navigate = useNavigate();
  const defaultCertThumb = "https://img.lovepik.com/free-png/20210919/lovepik-25d-information-technology-computer-technology-png-image_400948777_wh1200.png";
  
  return (
    <div
      onClick={() => navigate("/major/" + props.majorId)}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={props.majorImage || defaultCertThumb}
          alt={props.majorName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-purple-600 transition duration-300">
          {props.majorName}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Click to view certifications</span>
          <svg className="w-5 h-5 text-purple-600 transform group-hover:translate-x-2 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MajorCard;
