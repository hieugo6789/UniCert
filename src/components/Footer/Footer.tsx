import { Link } from "react-router-dom";

const Footer = () => {
  return <footer className="font-sans tracking-wide bg-black py-10 px-10">
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <li>
        <h3 className="text-violet-600 font-semibold text-5xl">25k+</h3>
        <p className="text-gray-300 text-sm mt-2">Certificates</p>
      </li>
      <li>
        <h3 className="text-violet-600 font-semibold text-5xl">320k+</h3>
        <p className="text-gray-300 text-sm mt-2">Students</p>
      </li>
      <li>
        <h3 className="text-violet-600 font-semibold text-5xl">150k+</h3>
        <p className="text-gray-300 text-sm mt-2">Courses</p>
      </li>
      <li>
        <h3 className="text-violet-600 font-semibold text-5xl">50k+</h3>
        <p className="text-gray-300 text-sm mt-2">Companies</p>
      </li>
    </ul>

    <hr className="my-10 border-violet-600" />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
      <div>
        <h4 className="text-violet-600 font-semibold text-lg mb-4">Quick Links</h4>
        <ul className="space-y-4">
          <li>
            <Link to="/about">
              <div className="hover:text-violet-600 text-gray-300 text-sm">About us</div>
            </Link>
          </li>
          <li>
            <Link to="/certificate" className="hover:text-violet-600 text-gray-300 text-sm">
              Certificate
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

      <div>
        <h4 className="text-violet-600 font-semibold text-lg mb-4">Major</h4>
        <ul className="space-y-4">
          <li>
            <a href="javascript:void(0)" className="hover:text-violet-600 text-gray-300 text-sm">Information Technology</a>
          </li>
          <li>
            <a href="javascript:void(0)" className="hover:text-violet-600 text-gray-300 text-sm">Software Technology</a>
          </li>
          <li>
            <a href="javascript:void(0)" className="hover:text-violet-600 text-gray-300 text-sm">Infomation System</a>
          </li>
          <li>
            <a href="javascript:void(0)" className="hover:text-violet-600 text-gray-300 text-sm">Marketing</a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-violet-600 font-semibold text-lg mb-4">Job Position</h4>
        <ul className="space-y-4">
          <li>
            <a href="javascript:void(0)" className="hover:text-violet-600 text-gray-300 text-sm">Backend Developer</a>
          </li>
          <li>
            <a href="javascript:void(0)" className="hover:text-violet-600 text-gray-300 text-sm">Frontend Developer</a>
          </li>
          <li>
            <a href="javascript:void(0)" className="hover:text-violet-600 text-gray-300 text-sm">Data Engineer</a>
          </li>
          <li>
            <a href="javascript:void(0)" className="hover:text-violet-600 text-gray-300 text-sm">Data</a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-violet-600 font-semibold text-lg mb-4">Company</h4>
        <ul className="space-y-4">
          <li>
            <a href="javascript:void(0)" className="hover:text-violet-600 text-gray-300 text-sm">Accessibility</a>
          </li>
          <li>
            <a href="javascript:void(0)" className="hover:text-violet-600 text-gray-300 text-sm">About</a>
          </li>
          <li>
            <a href="javascript:void(0)" className="hover:text-violet-600 text-gray-300 text-sm">Contact</a>
          </li>
          <li>
            <a href="javascript:void(0)" className="hover:text-violet-600 text-gray-300 text-sm">Learn more</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
};
export default Footer;
