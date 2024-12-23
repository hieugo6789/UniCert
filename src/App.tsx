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
import Feedback from "./page/Admin/Feedback";
import FeedbackForStaff from "./components/Feedback/FeedbackForStaff";
import PrivateRoutes from "./routes/PrivateRoutes";
import ResetPassword from "./page/Login&Register/ResetPassword";
import ManageStudents from "./page/Staff/ManageStudents";
import CheckStudentEnrollCode from "./components/Course/CheckStudentEnrollCode";
import CourseEnrollDetailPage from "./page/User/Courses/CourseEnrollDetailPage";
import Organization from "./page/User/Organization/Organization";
import OrganizationDetail from "./page/User/Organization/OrganizationDetail";
import Pathway from "./page/User/Pathway/Pathway";
import Refund from "./components/Wallet/Refund";
import RefundSuccess from "./components/Wallet/RefundSuccess";
import Transaction from "./page/Admin/Transaction";
import DetailCertificate from "./page/Staff/Detail/DetailCertificate";
import ManageCertDetail from "./page/Manager/ManageCertDetail";
import DetailMajor from "./page/Staff/Detail/DetailMajor";
import DetailJobPosition from "./page/Staff/Detail/DetailJobPosition";
import DetailOrganize from "./page/Staff/Detail/DetailOrganize";
import DetailExam from "./page/Staff/Detail/DetailExam";
import ManageExamDetail from "./page/Manager/Detail/ManageExamDetail";

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
  const token = localStorage.getItem("token");
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { path: "/exam/:id/simulation", element: <SimulationExamPage /> },
        { path: "/exam/:id/simulation/submit", element: <SubmitExamPage /> },
      ],
    },
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
        { path: "wallet/refund", element: <Refund /> },
        { path: "wallet/refund/success", element: <RefundSuccess /> },
        { path: "wallet/bill", element: <Bill /> },
        { path: "wallet/:transId", element: <Wallet /> },
        { path: "wallet/0", element: <Wallet /> },
        { path: "/cart", element: <Cart /> },
        { path: "/exam/:id", element: <ExamDetailPage /> },
        // { path: "/exam/:id/simulation", element: <SimulationExamPage /> },
        // { path: "/exam/:id/simulation/submit", element: <SubmitExamPage /> },
        { path: "/exam/:id/simulation/result", element: <ExamResultPage /> },
        { path: "/enrollment/:id", element: <CourseEnrollDetailPage /> },
        { path: "/organization", element: <Organization /> },
        { path: "/organization/:id", element: <OrganizationDetail /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/profile", element: <Profile /> },
        { path: "/reset-password", element: <ResetPassword /> },
        { path: "/pathway", element: <Pathway /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <PrivateRoutes
          token={token}
          requiredRole="Admin"
        >
          <LayoutAdmin />
        </PrivateRoutes>
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "decentralization", element: <Decentralization /> },
        { path: "students", element: <Students /> },
        { path: "feedback", element: <Feedback /> },
        { path: "feedback/exam/:id", element: <FeedbackForStaff /> },
        { path: "transaction", element: <Transaction /> },
      ],
    },
    {
      path: "/manager",
      element: (
        <PrivateRoutes
          token={token}
          requiredRole="Manager"
        >
          <LayoutManager />
        </PrivateRoutes>
      ),
      children: [
        { path: "certificate", element: <ManageCertification /> },
        { path: "certificate/:id", element: <ManageCertDetail /> },
        { path: "internalCourses", element: <ManageCourse /> },
        { path: "simulationExam", element: <ManageExam /> },
        { path: "simulationExam/:id", element: <ManageExamDetail /> },
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
          requiredRole="Staff"
        >
          <LayoutStaff />
        </PrivateRoutes>
      ),
      children: [
        { path: "schedule", element: <Schedule /> },
        { path: "internalCourses", element: <InternalCourses /> },
        { path: "internalCourses/:id", element: <ManageStudents /> },
        { path: "simulationExam", element: <SimulationExam /> },
        { path: "simulationExam/:id", element: <DetailExam /> },
        { path: "simulationExam/question/:id", element: <ManageQuestion /> },
        { path: "jobPosition", element: <JobPosition /> },
        { path: "jobPosition/:id", element: <DetailJobPosition /> },
        { path: "major", element: <Major /> },
        { path: "major/:id", element: <DetailMajor /> },
        { path: "organizations", element: <Organizations /> },
        { path: "organizations/:id", element: <DetailOrganize /> },
        { path: "certificate", element: <Certificate /> },
        { path: "certificate/:id", element: <DetailCertificate /> },
        {
          path: "internalCourses/checkEnrollCode",
          element: <CheckStudentEnrollCode />,
        },
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
