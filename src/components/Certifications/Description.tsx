import { allCertificationData } from "../../models/certificate";
import { allSchedulePaginationData } from "../../models/schedule";
import { allCoursePaginationData } from "../../models/course";
import CourseCard from "../Course/CourseCard";

interface DescriptionProps {
  props: allCertificationData;         
  schedule: allSchedulePaginationData[]; 
  course: allCoursePaginationData[];
}
const Description = ({ props, schedule, course}: DescriptionProps) => (  
  <>
    <h1 className="text-xl font-bold">Description</h1>
    <div
      className="prose list-disc whitespace-pre-wrap mb-2"
      dangerouslySetInnerHTML={{ __html: props?.certDescription || "" }}
    />
    <h1 className="text-xl font-bold mb-2">Organization: {props.organizeName}</h1>
    <h1 className="text-xl font-bold mb-2">Schedule</h1>
    {schedule.length > 0 ? (
      <ul className="list-disc list-inside mb-4">
        {schedule.map((session) => (
          <li key={session.sessionId} className="mb-2">
            <span className="font-medium">{session.sessionName}</span> - {new Date(session.sessionDate).toLocaleDateString()} at <span>{session.sessionAddress}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="mb-2">No schedule available.</p>
    )}
    <h1 className="text-xl font-bold mb-2">Training Course</h1>
    {course.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {course.map((course) => (
          <CourseCard 
            key={course.courseId} 
            course={course} 
            isInCart={false} 
            isPurchased={false}
            hideButton={true}
          />
        ))}
      </div>
    ) : (
      <p className="mb-2">No course available.</p>
    )}
  </>
);

export default Description;
