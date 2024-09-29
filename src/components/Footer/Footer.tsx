import { Link } from "react-router-dom";

const Footer = () => {
  return <footer className="bg-white py-10 px-6">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-8 gap-8">
    {/* UniCert - Logo & Description */}
    <div className="md:col-span-5">
      <h2 className="text-2xl font-bold">UniCert</h2>
      <p className="text-gray-600 mt-4">
        balalaika instead quaintly row a reasonable close rancher whereas
        closely swerve a growing decriminalise drake
      </p>
      <div className="mt-6">
        <h3 className="font-bold">Contact</h3>
        <p>Phone: 0793552206</p>
        <p>Email: minhnguyen@gmail.com</p>
      </div>
    </div>

    {/* Course Links  */}
    <div className="md:col-span-1">
      <h3 className="text-xl font-bold">Course</h3>
      <ul className="mt-4 space-y-2">
        <li>
          <Link to="/course-1" className="text-gray-600 hover:underline">Lorem Lorem</Link>
        </li>
        <li>
          <Link to="/course-2" className="text-gray-600 hover:underline">Lorem Lorem</Link>
        </li>
        <li>
          <Link to="/course-3" className="text-gray-600 hover:underline">Lorem Lorem</Link>
        </li>
        <li>
          <Link to="/course-4" className="text-gray-600 hover:underline">Lorem Lorem</Link>
        </li>
      </ul>
    </div>

    {/* Quick Start Links  */}
    <div className="md:col-span-1">
      <h3 className="text-xl font-bold">Quick Start</h3>
      <ul className="mt-4 space-y-2">
        <li>
          <Link to="/quick-start-1" className="text-gray-600 hover:underline">Lorem Lorem</Link>
        </li>
        <li>
          <Link to="/quick-start-2" className="text-gray-600 hover:underline">Lorem Lorem</Link>
        </li>
        <li>
          <Link to="/quick-start-3" className="text-gray-600 hover:underline">Lorem Lorem</Link>
        </li>
        <li>
          <Link to="/quick-start-4" className="text-gray-600 hover:underline">Lorem Lorem</Link>
        </li>
      </ul>
    </div>

    {/* FAQ Links  */}
    <div className="md:col-span-1 ">
      <h3 className="text-xl font-bold">FAQ</h3>
      <ul className="mt-4 space-y-2">
        <li>
          <Link to="/faq-1" className="text-gray-600 hover:underline">Lorem Lorem</Link>
        </li>
        <li>
          <Link to="/faq-2" className="text-gray-600 hover:underline">Lorem Lorem</Link>
        </li>
        <li>
          <Link to="/faq-3" className="text-gray-600 hover:underline">Lorem Lorem</Link>
        </li>
        <li>
          <Link to="/faq-4" className="text-gray-600 hover:underline">Lorem Lorem</Link>
        </li>
      </ul>
    </div>
  </div>
</footer>
};
export default Footer;
