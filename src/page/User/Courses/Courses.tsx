import { useEffect, useState } from "react";
import CourseCard from "../../../components/Course/CourseCard";
import { allCoursePaginationData } from "../../../models/course";
import useCourse from "../../../hooks/Course/useCourse";
import Loading from "../../../components/UI/Loading";

const Courses = () => {
  // const courses = [
  //   { title: 'AI Essentials', description: 'Khóa học cơ bản về AI', link: '#' },
  //   { title: 'An ninh mạng', description: 'Khóa học về an ninh mạng', link: '#' },
  //   { title: 'Phân tích dữ liệu nâng cao', description: 'Khóa học về phân tích dữ liệu', link: '#' },
  //   { title: 'Kinh doanh thông minh', description: 'Khóa học về kinh doanh thông minh', link: '#' },
  //   { title: 'Thiết kế UX', description: 'Khóa học về thiết kế trải nghiệm người dùng', link: '#' },
  //   { title: 'Quản lý dự án', description: 'Khóa học về quản lý dự án', link: '#' },
  // ];
  const [courses, setCourses] = useState<allCoursePaginationData[]>([]);
  const { course, loading, refetchCourses } = useCourse();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        await refetchCourses();
      } catch (error) {
        console.error('Failed to fetch courses: ', error);
      }
    };
    fetchCourses();
  }, []);
  useEffect(() => {
    setCourses(course);
  }, [course]);
  return (
    <div>
      <div className="text-center py-10 bg-purple-400 text-white">
          <h1 className="text-4xl font-bold">
            Explore courses to review certifications
          </h1>
        </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 py-10">
        {courses.map((course, idx) => (
          <CourseCard key={idx} {...course} />
        ))}
      </section>

      <div className="mt-10 flex justify-center items-center  min-h-screen">
        <div className=" w-11/12 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white ">
          {/* Left side */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Quickly build skills and earn certificates to get a job in the field you want with Unicert.
            </h1>
          </div>

          {/* Right side */}
          <div className="flex flex-col space-y-6">
            {/* Item 1 */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">
                Complete the course and get a certificate from Unicert
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">
                Applicate for a job with the certificate you have earned
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* logo carousel */}
      <div
        x-data="{}"
        x-init="$nextTick(() => {
                        let ul = $refs.logos;
                        ul.insertAdjacentHTML('afterend', ul.outerHTML);
                        ul.nextSibling.setAttribute('aria-hidden', 'true');
                    })"
        className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
      >
        <ul x-ref="logos" className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
          <li>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk9I4ShLVuwDVX2-9DHBxIjc0rm-mjbRlvVg&s" alt="Facebook" />
          </li>
          <li>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlg7j2mGIyJd7KlIolTsvlMsOPL_XUaVGuRJBAhfhF72uumbgaBAdtqEeGF34iPNiS1Tk&usqp=CAU" alt="Disney" />
          </li>
          <li>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlg7j2mGIyJd7KlIolTsvlMsOPL_XUaVGuRJBAhfhF72uumbgaBAdtqEeGF34iPNiS1Tk&usqp=CAU" alt="Airbnb" />
          </li>
          <li>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlg7j2mGIyJd7KlIolTsvlMsOPL_XUaVGuRJBAhfhF72uumbgaBAdtqEeGF34iPNiS1Tk&usqp=CAU" alt="Apple" />
          </li>
          <li>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlg7j2mGIyJd7KlIolTsvlMsOPL_XUaVGuRJBAhfhF72uumbgaBAdtqEeGF34iPNiS1Tk&usqp=CAU" alt="Spark" />
          </li>
          <li>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlg7j2mGIyJd7KlIolTsvlMsOPL_XUaVGuRJBAhfhF72uumbgaBAdtqEeGF34iPNiS1Tk&usqp=CAU" alt="Samsung" />
          </li>
          <li>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlg7j2mGIyJd7KlIolTsvlMsOPL_XUaVGuRJBAhfhF72uumbgaBAdtqEeGF34iPNiS1Tk&usqp=CAU" alt="Quora" />
          </li>
          <li>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlg7j2mGIyJd7KlIolTsvlMsOPL_XUaVGuRJBAhfhF72uumbgaBAdtqEeGF34iPNiS1Tk&usqp=CAU" alt="Sass" />
          </li>
        </ul>
      </div>
      {loading &&
        <Loading />
      }
    </div>
  );
};
export default Courses;
