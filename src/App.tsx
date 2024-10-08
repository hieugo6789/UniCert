import { Outlet } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/User/HomePage";
import CertificatePage from "./page/User/Certificate/CertificatePage";
import LayoutAdmin from "./page/Admin/Layout/LayoutAdmin";
import Dashboard from "./page/Admin/Dashboard";
import Certificate from "./page/Admin/Certificate";
import Decentralization from "./page/Admin/Decentralization";
import Exam from "./page/Admin/Exam";
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
        { path: "practicalExam", element: <PracticalExam /> },
        { path: "majors", element: <Majors /> },
        { path: "job", element: <Job /> },
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
        { path: "exam", element: <Exam /> },
        { path: "jobPosition", element: <JobPosition /> },
        { path: "major", element: <Major /> },
        { path: "organizations", element: <Organizations /> },
        { path: "students", element: <Students /> },
        { path: "internalCourses", element: <InternalCourses /> },
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
