import Hexagon from "../../assets/images/AboutPage/Hexagon.png";
import Achie from "../../assets/images/AboutPage/Achievement.png";
import LeadershipBadge from "../../assets/images/AboutPage/LeadershipBadge.png";
import LeaderShipBadgeFrame from "../../assets/images/AboutPage/LeaderShipBadgeFrame.png";
const achievements = [
  { title: "6 Years", description: "Lorem ipsum dolor sit amet.", icon: "📅" },
  {
    title: "100+ Certificates",
    description: "Lorem ipsum dolor sit amet.",
    icon: "📜",
  },
  {
    title: "100+ Students",
    description: "Lorem ipsum dolor sit amet.",
    icon: "👨‍🎓",
  },
];
const leaders = [
  {
    name: "John John",
    image: "https://www.cdpp.gov.au/system/files/2023-12/Raelene%20Sharp.png",
  },
  {
    name: "John John",
    image: "https://www.cdpp.gov.au/system/files/2023-12/Raelene%20Sharp.png",
  },
  {
    name: "John John",
    image: "https://www.cdpp.gov.au/system/files/2023-12/Raelene%20Sharp.png",
  },
];
const AboutPage = () => {
  return (
    <div>
      {/* About */}
      <div className="text-center my-16">
        <h1 className="text-4xl font-bold">About Us</h1>
        <div className="flex justify-center items-center mt-8 space-x-8">
          <div className="max-w-xs">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="w-2/12">
            <img
              src={Hexagon}
              alt=""
            />
          </div>
          <div className="max-w-xs">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
