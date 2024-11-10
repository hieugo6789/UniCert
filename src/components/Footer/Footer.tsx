import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="font-sans tracking-wide bg-black py-10 px-10">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-violet-600 font-semibold text-4xl md:text-6xl text-center">UNICERT</h1>
        <p className="text-gray-300 text-center mt-2 text-sm">Your Path to Professional Certification</p>
        <hr className="my-8 border-violet-600" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8">
          <div>
            <h4 className="text-violet-600 font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="hover:text-violet-600 text-gray-300 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/certificate" className="hover:text-violet-600 text-gray-300 text-sm">
                  Certificates
                </Link>
              </li>
              <li>
                <Link to="/majors" className="hover:text-violet-600 text-gray-300 text-sm">
                  Major
                </Link>
              </li>
              <li>
                <Link to="/job" className="hover:text-violet-600 text-gray-300 text-sm">
                  Job Position
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:text-center">
            <h4 className="text-violet-600 font-semibold text-lg mb-4">Popular Certificates</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/certificates/aws" className="hover:text-violet-600 text-gray-300 text-sm">
                  AWS Certification
                </Link>
              </li>
              <li>
                <Link to="/certificates/azure" className="hover:text-violet-600 text-gray-300 text-sm">
                  Microsoft Azure
                </Link>
              </li>
              <li>
                <Link to="/certificates/cisco" className="hover:text-violet-600 text-gray-300 text-sm">
                  Cisco CCNA
                </Link>
              </li>
              <li>
                <Link to="/certificates/comptia" className="hover:text-violet-600 text-gray-300 text-sm">
                  CompTIA A+
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:text-right">
            <h4 className="text-violet-600 font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="text-gray-300 text-sm">
                <span className="block">Email:</span>
                support@unicert.com
              </li>
              <li className="text-gray-300 text-sm">
                <span className="block">Phone:</span>
                +84 909 123 456
              </li>
              <li className="text-gray-300 text-sm">
                <span className="block">Address:</span>
                FPT University, Ho Chi Minh City
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-400 text-sm">
          <p>© 2024 UNICERT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
