import { allCertificationData } from "../../models/certificate";

const Description = (props: allCertificationData) => (
  <>
    <h1 className="text-xl font-bold">Description</h1>
    <div
      className="prose list-disc whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: props?.certDescription || "" }}
    />
    <h1 className="text-xl font-bold mb-5">Organazations</h1>
    <h1 className="text-xl font-bold mb-5">Schedule</h1>
    <h1 className="text-xl font-bold mb-5">Training Course</h1>
  </>
);

export default Description;
