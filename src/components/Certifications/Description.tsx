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
  <div className="space-y-8">
    {/* Description Section */}
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
      <div
        className="prose max-w-none text-gray-600 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: props?.certDescription || "" }}
      />
    </div>

    {/* Organization Section */}
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        Organization: {props.organizeName}
      </h2>
    </div>

    {/* Schedule Section */}
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Available Schedules
      </h2>
      
      {schedule.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schedule.map((session) => (
            <div 
              key={session.sessionId} 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="bg-purple-50 px-6 py-4 border-b border-purple-100">
                <h3 className="text-lg font-semibold text-purple-700">
                  {session.sessionName}
                </h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {new Date(session.sessionDate).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                    }).replace(",", "")}
                  </span>
                </div>

                <div className="flex items-center text-gray-600">
                  <svg className="w-8 h-8 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{session.sessionAddress}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{session.sessionTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-purple-50 rounded-xl p-6 text-center">
          <svg className="w-12 h-12 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-purple-600 font-medium">No exam sessions available at the moment.</p>
        </div>
      )}
    </div>

    {/* Training Course Section */}
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Training Courses
      </h2>
      
      {course.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="bg-purple-50 rounded-xl p-6 text-center">
          <svg className="w-12 h-12 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-purple-600 font-medium">No training courses available at the moment.</p>
        </div>
      )}
    </div>
  </div>
);

export default Description;
