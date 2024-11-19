import { useParams } from "react-router-dom";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import Notification from "../../components/Notification/Notification";
import Breadcrumbs from "../../components/UI/Breadcrumb";
import useStudentList from "../../hooks/Course/useStudentList";
import defaultAvatar from "../../assets/images/Avatar/DefaultAvatar.jpg";

const ManageStudents = () => {
  const courseId = Number(useParams().id || 0);
  const { students, loading } = useStudentList({ courseId });

  return (
    <>
      <div className="h-[10vh] flex justify-between items-center bg-gradient-to-r p-4">
        <div className="text-2xl font-semibold">Student List</div>
        <div className="mr-10 flex items-center">
          <div className="mr-6">
            <Notification />
          </div>
          <AvatarAdmin />
        </div>
      </div>
      <div className="gap-4 p-2 h-[90vh]">
        <Breadcrumbs
          items={[
            { label: "Course management", link: "/staff/internalCourses" },
            { label: `Students` },
          ]}
        />
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
              <table className="min-w-full bg-white">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-3 py-3 text-left text-sm font-medium">
                      No
                    </th>

                    <th className="px-2 py-3 text-left text-sm font-medium">
                      Name
                    </th>
                    <th className="px-2 py-3 text-left text-sm font-medium">
                      Date of birth
                    </th>
                    <th className="px-2 py-3 text-left text-sm font-medium">
                      Email
                    </th>
                    <th className="px-2 py-3 text-left text-sm font-medium">
                      Phone
                    </th>
                    <th className="px-2 py-3 text-left text-sm font-medium">
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student.userId}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-colors duration-300 h-full`}
                    >
                      <td className="border-t px-4 py-2 text-left">
                        {index + 1}
                      </td>

                      <td className="border-t px-2 py-2 text-left">
                        <div className="flex items-center gap-2">
                          <img
                            src={student.userImage || defaultAvatar}
                            alt={student.fullname}
                            className="w-12 h-12 rounded-full"
                          />
                          <span className="ml-1">{student.fullname}</span>
                        </div>
                      </td>
                      <td className="border-t px-3 py-2 text-left">
                        {new Date(student.dob).toLocaleDateString("en-GB")}
                      </td>
                      <td className="border-t px-3 py-2 text-left">
                        {student.email}
                      </td>
                      <td className="border-t px-4 py-2 text-left">
                        {student.phoneNumber}
                      </td>
                      <td className="border-t px-4 py-2 text-left">
                        {student.address}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageStudents;
