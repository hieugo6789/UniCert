import { Outlet } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/User/HomePage";
import CertificatePage from "./page/User/Certificate/CertificatePage";
import Dashboard from "./page/Admin/Dashboard";
import Certificate from "./page/Staff/Certificate";
import Decentralization from "./page/Admin/Decentralization";
import Schedule from "./page/Staff/Schedule";
import JobPosition from "./page/Staff/JobPosition";
import Major from "./page/Staff/Major";
import Organizations from "./page/Staff/Organizations";
import Students from "./page/Admin/Students";
import Login from "./page/Login&Register/Login";
import Register from "./page/Login&Register/Register";
import Header from "./components/Header/Header";
import AboutPage from "./page/User/AboutPage";
import Footer from "./components/Footer/Footer";
import InternalCourses from "./page/Staff/InternalCourses";
import PracticalExam from "./page/User/PracticalExam/PracticalExam";
import Majors from "./page/User/Majors/Majors";
import Job from "./page/User/Job/Job";
import Profile from "./page/Profile/Profile";
import NotFound from "./page/NotFound/NotFound";
import CertificateDetailPage from "./page/User/Certificate/CertificateDetailPage";
import MajorDetailPage from "./page/User/Majors/MajorDetailPage";
import JobDetail from "./page/User/Job/JobDetail";
import Wallet from "./page/User/Wallet/Wallet";
import Courses from "./page/User/Courses/Courses";
import SimulationExam from "./page/Staff/SimulationExam";
import Voucher from "./page/Manager/Voucher";
import CourseDetail from "./page/User/Courses/CourseDetail";
import Bill from "./page/User/Wallet/Bill";
import LayoutAdmin from "./components/Layout/LayoutAdmin";
import LayoutManager from "./components/Layout/LayoutManager";
import LayoutStaff from "./components/Layout/LayoutStaff";
import HistoryPage from "./page/User/History/HistoryPage";
import ManageCertification from "./page/Manager/ManageCertification";
import ManageCourse from "./page/Manager/ManageCourse";
import ManageExam from "./page/Manager/ManageExam";
import ManageJobPosition from "./page/Manager/ManageJobPosition";
import ManageMajor from "./page/Manager/ManageMajor";
import ManageOrganize from "./page/Manager/ManageOrganize";
import Cart from "./page/User/Cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimulationExamPage from "./page/User/Exam/SimulationExamPage";
import ManageQuestion from "./page/Staff/ManageQuestion";
import ExamDetailPage from "./page/User/Exam/ExamDetailPage";
import SubmitExamPage from "./page/User/Exam/SubmitExamPage";
import ExamResultPage from "./page/User/Exam/ExamResultPage";
import Feedback from "./page/Staff/Feedback";
import FeedbackForStaff from "./components/Feedback/FeedbackForStaff";
import Cookies from "js-cookie";
import PrivateRoutes from "./routes/PrivateRoutes";

const token = localStorage.getItem("token");
const role = Cookies.get("role");

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "certificate", element: <CertificatePage /> },
        { path: "certificate/:id", element: <CertificateDetailPage /> },
        { path: "practicalExam", element: <PracticalExam /> },
        { path: "courses", element: <Courses /> },
        { path: "course/:id", element: <CourseDetail /> },
        { path: "majors", element: <Majors /> },
        { path: "major/:id", element: <MajorDetailPage /> },
        { path: "job", element: <Job /> },
        { path: "job/:id", element: <JobDetail /> },
        { path: "history/:id", element: <HistoryPage /> },
        { path: "wallet", element: <Wallet /> },
        { path: "wallet/bill", element: <Bill /> },
        { path: "wallet/:transId", element: <Wallet /> },
        { path: "wallet/0", element: <Wallet /> },
        { path: "/cart", element: <Cart /> },
        { path: "/exam/:id", element: <ExamDetailPage /> },
        { path: "/exam/:id/simulation", element: <SimulationExamPage /> },
        { path: "/exam/:id/simulation/submit", element: <SubmitExamPage /> },
        { path: "/exam/:id/simulation/result", element: <ExamResultPage /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/profile", element: <Profile /> },
    {
      path: "/admin",
      element: (
        <PrivateRoutes
          token={token}
          role={role}
          requiredRole="Admin"
        >
          <LayoutAdmin />
        </PrivateRoutes>
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "decentralization", element: <Decentralization /> },
        { path: "students", element: <Students /> },
      ],
    },
    {
      path: "/manager",
      element: (
        <PrivateRoutes
          token={token}
          role={role}
          requiredRole="Manager"
        >
          <LayoutManager />
        </PrivateRoutes>
      ),
      children: [
        { path: "certificate", element: <ManageCertification /> },
        { path: "internalCourses", element: <ManageCourse /> },
        { path: "simulationExam", element: <ManageExam /> },
        { path: "jobPosition", element: <ManageJobPosition /> },
        { path: "major", element: <ManageMajor /> },
        { path: "organizations", element: <ManageOrganize /> },
        { path: "voucher", element: <Voucher /> },
      ],
    },
    {
      path: "/staff",
      element: (
        <PrivateRoutes
          token={token}
          role={role}
          requiredRole="Staff"
        >
          <LayoutStaff />
        </PrivateRoutes>
      ),
      children: [
        { path: "schedule", element: <Schedule /> },
        { path: "internalCourses", element: <InternalCourses /> },
        { path: "simulationExam", element: <SimulationExam /> },
        { path: "simulationExam/:id", element: <ManageQuestion /> },
        { path: "jobPosition", element: <JobPosition /> },
        { path: "major", element: <Major /> },
        { path: "organizations", element: <Organizations /> },
        { path: "certificate", element: <Certificate /> },
        { path: "feedback", element: <Feedback /> },
        { path: "feedback/exam/:id", element: <FeedbackForStaff /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
