import { Outlet } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/User/HomePage";
import CertificatePage from "./page/User/Certificate/CertificatePage";
import LayoutAdmin from "./page/Admin/Layout/LayoutAdmin";
import Dashboard from "./page/Admin/Dashboard";
import Certificate from "./page/Admin/Certificate";
import Decentralization from "./page/Admin/Decentralization";
import Schedule from "./page/Admin/Schedule";
import JobPosition from "./page/Admin/JobPosition";
import Major from "./page/Admin/Major";
import Organizations from "./page/Admin/Organizations";
import Students from "./page/Admin/Students";
import Login from "./page/Login&Register/Login";
import Register from "./page/Login&Register/Register";
import Header from "./components/Header/Header";
import AboutPage from "./page/User/AboutPage";
import Footer from "./components/Footer/Footer";
import InternalCourses from "./page/Admin/InternalCourses";
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
import SimulationExam from "./page/Admin/SimulationExam";
import Voucher from "./page/Admin/Voucher";
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
        { path: "majors", element: <Majors /> },
        { path: "major/:id", element: <MajorDetailPage /> },
        { path: "job", element: <Job /> },
        { path: "job/:id", element: <JobDetail /> },
        { path: "wallet", element: <Wallet /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/profile", element: <Profile /> },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "certificate", element: <Certificate /> },
        { path: "decentralization", element: <Decentralization /> },
        { path: "schedule", element: <Schedule /> },
        { path: "jobPosition", element: <JobPosition /> },
        { path: "major", element: <Major /> },
        { path: "organizations", element: <Organizations /> },
        { path: "students", element: <Students /> },
        { path: "internalCourses", element: <InternalCourses /> },
        { path: "simulationExam", element: <SimulationExam /> },
        { path: "voucher", element: <Voucher /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
