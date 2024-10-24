import Hexagon from "../../assets/images/AboutPage/Hexagon.png";
import Achie from "../../assets/images/AboutPage/Achievement.png";
import LeadershipBadge from "../../assets/images/AboutPage/LeadershipBadge.png";
import LeaderShipBadgeFrame from "../../assets/images/AboutPage/LeaderShipBadgeFrame.png";
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
  },
  {
    name: "Bình Minh",
    image: "https://www.cdpp.gov.au/system/files/2023-12/Raelene%20Sharp.png",
  },
  {
    name: "Thành Đạt",
    image: "https://www.cdpp.gov.au/system/files/2023-12/Raelene%20Sharp.png",
  },
  {
    name: "Trung Tín",
    image: "https://www.cdpp.gov.au/system/files/2023-12/Raelene%20Sharp.png",
  },
];

const AboutPage = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Cuộn mượt mà
      });
    };
    scrollToTop();
  });
  return (
    <div>
      {/* About */}
      <div className="text-center my-16">
        <h1 className="text-4xl font-bold">About Us</h1>
        <div className="flex justify-center items-center mt-8 space-x-8">
          <div className="max-w-xs">
          <p>We are a dedicated platform offering detailed and accurate certification information, mock tests, and study resources for students. Our goal is to empower learners to excel in their professional certification exams.</p>
          </div>
          <div className="w-2/12">
            <img
              src={Hexagon}
              alt=""
            />
          </div>
          <div className="max-w-xs">
          <p>With a strong commitment to education, we’ve helped thousands of students achieve their certification dreams across multiple industries and technologies.</p>
          </div>
        </div>
      </div>
      {/* Achievement */}
      <div className="text-center my-16">
        <h1 className="text-4xl font-bold mb-20">Achievement</h1>
        <div className="flex justify-center mt-8 space-x-8">
          {achievements.map((achieve, index) => (
            <div
              key={index}
              className="flex flex-col"
            >
              <div className="relative flex justify-center items-center w-full h-full">
                <img
                  src={Achie}
                  alt="achievement icon"
                  className="absolute w-20"
                />
                <span className="text-4xl absolute">{achieve.icon}</span>
              </div>
              <h3 className="mt-20 text-xl font-bold">{achieve.title}</h3>
              <p className="max-w-xs">{achieve.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* The Leadership*/}
      <div className="text-center my-16">
        <h1 className="text-4xl font-bold">The Leadership</h1>
        <div className="flex justify-center mt-8 space-x-8">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center"
            >
              <img src={LeadershipBadge} />

              <img
                src={leader.image}
                alt={leader.name}
                className="absolute top-10 clip-hexagon w-full mr-5"
              />
              <img
                src={LeaderShipBadgeFrame}
                className="absolute"
              />
              <h3 className="mt-4 text-xl font-bold">{leader.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
