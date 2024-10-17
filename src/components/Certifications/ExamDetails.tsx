import { allCertificationData } from "../../models/certificate";

const ExamDetails = (props: allCertificationData) => {
  return (
    <div>{props?.certPointSystem}</div>
  )
}

export default ExamDetails