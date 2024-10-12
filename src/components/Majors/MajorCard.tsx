import { useNavigate } from "react-router-dom";
// import defaultCertThumb from "../../assets/images/Certification/defaultCertThumb.png";
import { allMajorPaginationData } from "../../models/major";

const MajorCard = (props: allMajorPaginationData) => {
  const navigate = useNavigate();
  return (
    <div
      className="border rounded-xl shadow-md p-4 bg-white w-80 m-auto min-h-60
     cursor-pointer ease-in-out duration-300 hover:bg-gray-200 hover:scale-105"
      onClick={() => navigate("/major/" + props.majorId)}
    >
      <img
        // src={props.certImage ? props.certImage : defaultCertThumb}
        src="https://img.lovepik.com/free-png/20210919/lovepik-25d-information-technology-computer-technology-png-image_400948777_wh1200.png"
        alt="Major Image"
        className="w-full h-1/3 object-cover mb-4 rounded-xl"
      />
      <h3 className="text-lg font-semibold">{props.majorName}</h3>
    </div>
  );
};

export default MajorCard;
