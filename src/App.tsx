import { Outlet } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/Student/HomePage";
import CertificatePage from "./page/Student/CertificatePage";
import LayoutAdmin from "./page/Admin/LayoutAdmin";
import Dashboard from "./page/Admin/Dashboard";
import Certificate from "./page/Admin/Certificate";
import Decentralization from "./page/Admin/Decentralization";
import Exam from "./page/Admin/Exam";
import JobPosition from "./page/Admin/JobPosition";
import Major from "./page/Admin/Major";
import Organizations from "./page/Admin/Organizations";
import Students from "./page/Admin/Students";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement : <Not
      children: [
        { index: true, element: <HomePage /> },
        { path: "certificate", element: <CertificatePage /> },
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "certificate", element: <Certificate /> },
        { path: "decentralization", element: <Decentralization /> },
        { path: "exam", element: <Exam /> },
        { path: "jobPosition", element: <JobPosition /> },
        { path: "major", element: <Major /> },
        { path: "organizations", element: <Organizations /> },
        { path: "students", element: <Students /> },
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
