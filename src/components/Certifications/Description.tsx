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
      <div className="space-y-4 mb-2">
        {schedule.map((session) => (
          <div key={session.sessionId} className="bg-white p-4 rounded-lg shadow-md border rounded-xl">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-blue-600">{session.sessionName}</h2>
              <p>
                <strong>Exam Day: </strong>
                {new Date(session.sessionDate).toLocaleString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                }).replace(",", "")}
              </p>
              <p>
                <strong>Location:</strong> <span>{session.sessionAddress}</span>
              </p>
              <p>
                <strong>Time:</strong> <span>{session.sessionTime}</span>
              </p>              
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="mb-2">No schedule available.</p>
    )}
    <h1 className="text-xl font-bold mb-2">Training Course</h1>
    {course.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
