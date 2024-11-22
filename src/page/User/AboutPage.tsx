import logoLight from "../../assets/images/UniCertLogo.png";
import logoDark from "../../assets/images/LogoHeader.png";
import Achie from "../../assets/images/AboutPage/Achievement.png";
import { useEffect } from "react";
const achievements = [
  { title: "4 Years in FPT University", description: "Final-year students at FPT University", icon: "📅" },
  {
    title: "100+ Certificates",
    description: "Delivering top-quality certification resources for students in Ho Chi Minh City.",
    icon: "📜",
  },
  {
    title: "100+ Students",
    description: "Helping over a thousand students to achieve their goals and career aspirations.",
    icon: "👨‍🎓",
  },
];
const leaders = [
  {
    name: "Tuấn Minh",
    image: "https://www.cdpp.gov.au/system/files/2023-12/Raelene%20Sharp.png",
    role: "Frontend Developer",
  },
  {
    name: "Bình Minh",
    image: "https://www.cdpp.gov.au/system/files/2023-12/Raelene%20Sharp.png",
    role: "Frontend Developer",
  },
  {
    name: "Thành Đạt",
    image: "https://www.cdpp.gov.au/system/files/2023-12/Raelene%20Sharp.png",
    role: "Backend Developer",
  },
  {
    name: "Trung Tín",
    image: "https://www.cdpp.gov.au/system/files/2023-12/Raelene%20Sharp.png",
    role: "Frontend Developer",
  },
];

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Unicert</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Empowering students with professional certifications for a better future
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We are a dedicated platform offering detailed and accurate certification information, 
                mock tests, and study resources for students. Our goal is to empower learners to 
                excel in their professional certification exams.
              </p>
            </div>
          </div>
          
          <div className="md:w-1/3 flex justify-center">
            <img
              src={logoLight} 
              alt="Logo"
              className="block dark:hidden w-48 md:w-64 transform hover:scale-105 transition-transform duration-300"
            />
            <img
              src={logoDark}
              alt="Logo"
              className="hidden dark:block w-48 md:w-64 transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                With a strong commitment to education, we've helped thousands of students achieve 
                their certification dreams across multiple industries and technologies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Our Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achieve, index) => (
              <div
                key={index}
                className="bg-purple-50 dark:bg-gray-700 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative flex justify-center items-center mb-6">
                  <img
                    src={Achie}
                    alt="achievement background"
                    className="w-24"
                  />
                  <span className="absolute text-4xl">{achieve.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  {achieve.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {achieve.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-16">
          Meet Our Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="flex flex-col items-center group"
            >
              <div className="relative w-48 h-48 mb-6">
                <div className="w-full h-full overflow-hidden" 
                     style={{
                       clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                     }}>
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {leader.name}
                </h3>
                <p className="text-purple-600 dark:text-purple-400">{leader.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
