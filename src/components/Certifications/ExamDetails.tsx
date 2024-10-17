import { allCertificationData } from "../../models/certificate";

const ExamDetails = (props: allCertificationData) => {
  return (    
      <div
        className="prose list-disc whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: props?.certPointSystem || "" }}
      />    
  );
};

export default ExamDetails;