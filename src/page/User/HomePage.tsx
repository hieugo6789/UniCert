import { useEffect, useState } from "react";
import CustomCarousel from "../../components/Carousel/CustomCarousel";
import BannerCard from "../../components/UI/BannerCard";
import { cardCertificate } from "../../models/certificate";
import CertificateCard from "../../components/Certifications/CertificateCard";
import CustomButton from "../../components/UI/CustomButton";
import { useNavigate  } from "react-router-dom";
// import Banner1 from "../../assets/images/Banner/Banner1.png";
const HomePage = () => {
  const navigate = useNavigate();
  const [topCert] = useState<cardCertificate[]>([
    {
      certId: 1,
      certName: "AWS Certified Developer",
      certCode: "AWS-CD",
      certDescription:
        "The AWS Certified Developer – Associate examination is intended for individuals who perform a development role and have one or more years of hands-on experience developing and maintaining an AWS-based application.",      
      certImage: "",
      certValidity: "3 years",      
      organizeName: "Amazon Web Services",      
      typeName: "Associate",      
    },
    {
      certId: 2,
      certName: "AWS Certified Developer",
      certCode: "AWS-CD",
      certDescription:
        "The AWS Certified Developer – Associate examination is intended for individuals who perform a development role and have one or more years of hands-on experience developing and maintaining an AWS-based application.",            
      certImage: "",
      certValidity: "3 years",      
      organizeName: "Amazon Web Services",      
      typeName: "Associate",      
    },
    {
      certId: 3,
      certName: "AWS Certified Developer",
      certCode: "AWS-CD",
      certDescription:
        "The AWS Certified Developer – Associate examination is intended for individuals who perform a development role and have one or more years of hands-on experience developing and maintaining an AWS-based application.",      
      certImage: "",
      certValidity: "3 years",      
      organizeName: "Amazon Web Services",      
      typeName: "Associate",      
    },
    {
      certId: 4,
      certName: "AWS Certified Developer",
      certCode: "AWS-CD",
      certDescription:
        "The AWS Certified Developer – Associate examination is intended for individuals who perform a development role and have one or more years of hands-on experience developing and maintaining an AWS-based application.",
      certImage: "",
      certValidity: "3 years",      
      organizeName: "Amazon Web Services",      
      typeName: "Associate",      
    },
  ]);

  // Function to handle the fade-in effect
  const handleIntersection = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  };

  // Add observer to all elements with class 'fade-in'
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

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
      <div className="fade-in">
        <CustomCarousel />
      </div>
      <div className="grid grid-cols-3 p-5 gap-2 m-auto  relative -mt-28 w-2/3">
        <div className="fade-in">
          <BannerCard />
        </div>
        <div className="fade-in">
          <BannerCard />
        </div>
        <div className="fade-in">
          <BannerCard />
        </div>
      </div>
      <div className="text-center font-bold text-6xl mt-20">
        <h1 className={`mt-10 text-center fade-in uppercase text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient`}
        >
          Why Should You Get Certified With</h1>
        <h1 className="text-blue-700 fade-in">UniCert?</h1>
        <p className="text-xl font-thin w-2/3 m-auto fade-in">
          UniCert is your go-to platform for certifications, offering a comprehensive collection of globally recognized certifications tailored for university students. Certifications like <strong>ISTQB</strong>, <strong>CompTIA A+</strong>, <strong>CCNA</strong>, and <strong>CISSP</strong> can significantly boost your career, and UniCert makes it easier than ever to explore these paths.
          <br /><br />
          Our platform provides all the essential details — from exam schedules to costs and prerequisites — so you can make informed decisions. Plus, we offer <strong>mock tests</strong> to simulate the real exam environment, helping you feel fully prepared.
          <br /><br />
          With UniCert, you’ll benefit from a user-friendly portal, access to top certifications, and resources designed to guide you through every step of your certification journey.
        </p>
        <div className="px-20 fade-in">
          <CustomButton
            label="Read more about us"
            shining
            onClick={() => navigate("/about")}
            className="w-1/2 mt-5 mb-5"
          />
        </div>
      </div>

      <div className="text-center font-bold text-6xl mt-20">
        <h1 className={`mt-10 mb-5 text-center fade-in uppercase text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient`}
        >
          Best Certificate For You
        </h1>

        <div className=" w-full grid grid-cols-1 gap-2 md:grid-cols-1 xs:grid-cols:2 xl:grid-cols-4">
          {topCert.map((cert) => (
            <div className="fade-in">
              <CertificateCard {...cert} />
            </div>
          ))}
        </div>

        <div className="px-20 fade-in">
          <CustomButton
            label="Get More Certificate"
            shining
            onClick={() => navigate("/certificate")}
            className="w-1/2 mt-5 mb-5"
          />
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row text-center">
        <div className="m-auto p-5 lg:p-20 fade-in lg:w-2/3">
          <h1
            className={`mt-10 text-center fade-in uppercase text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient`}
          >
            {" "}
            Prepare for Your Certification Exams
          </h1>
          <p className="pt-2 text-xl">
            Our platform is designed to support students as they navigate the path to earning their certifications. 
            We provide a comprehensive suite of resources, including simulation exams that simulate the real exam environment, 
            allowing you to familiarize yourself with the format, timing, and type of questions you'll encounter. 
            Whether you're preparing for AWS, ISTQB, CompTIA A+, CCNA, or other major certifications, 
            our mock tests are tailored to help you assess your readiness and identify areas for improvement.
            <br /><br />          
            In addition to simulation exams, we offer in-depth courses that cover all key topics for each certification. 
            These courses are carefully structured to guide you through the essential concepts and skills required for success. 
            Our lessons are designed to cater to students at various levels, from beginners building foundational knowledge 
            to more experienced learners aiming to refine their expertise. By combining simulation exams with targeted study materials, 
            you’ll have everything you need to master the content and feel fully prepared for the exam.
          </p>
          <CustomButton
            label="View Some Courses"
            shining
            onClick={() => navigate("/courses")}
            className="w-full lg:w-1/2 mt-5 mb-5 fade-in"
          />
        </div>
        {/* <img src={Banner1} alt="" className="w-full lg:w-1/3 fade-in mx-auto lg:mx-0 mt-5 lg:mt-0" /> */}
      </div>
      <div>
        <h1
          className={`mt-10 text-center fade-in uppercase text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient`}
        >
          Unicert's Learning Pathway
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-1 gap-4 text-center py-8 p-32">
          <div className="p-4 bg-gray-200 rounded-lg shadow-md fade-in">
            <h2 className="text-xl font-bold">Beginner</h2>
            <p>Step 1: Lay the foundations</p>
            <div className="m-auto w-full h-64 fade-in">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1VRZFDf95Gk6XvurWkFVvRMoleYLfCsGVAQ&s"
                alt="Beginner Level Icon"
                className="w-full h-full object-cover object-center shadow-lg rounded-lg"
              />
            </div>
          </div>

          <div className="p-4 bg-blue-200 rounded-lg shadow-md fade-in">
            <h2 className="text-xl font-bold">Associate</h2>
            <p>Step 2: Build proficiency</p>
            <div className="m-auto w-full h-64 fade-in">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUBgqiBtKaMUnKxr7VDl_hKYpCtYfDC-xjJ6XufsdZ1xVQfoXXySVnov6szllMXwQS1O4&usqp=CAU"
                alt="Beginner Level Icon"
                className="w-full h-full object-cover object-center shadow-lg rounded-lg"
              />
            </div>
          </div>

          <div className="p-4 bg-green-200 rounded-lg shadow-md fade-in">
            <h2 className="text-xl font-bold">Professional</h2>
            <p>Step 3: Achieve expertise</p>
            <div className="m-auto w-full h-64 fade-in">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWeISxrDQVThFaKuzfzee64rgTQAauQpj5YQSWTD0gzPnZRJKXAv1y7-qDU9RjDYt2mNU&usqp=CAU"
                alt="Beginner Level Icon"
                className="w-full h-full object-cover object-center shadow-lg rounded-lg"
              />
            </div>
          </div>

          <div className="p-4 bg-purple-200 rounded-lg shadow-md fade-in">
            <h2 className="text-xl font-bold">Specialty</h2>
            <p>Step 4: Mastery in a niche</p>
            <div className="m-auto w-full h-64 fade-in">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEzpN_mvC7EOdgx-HkhAYLjgNdSaByXzhzOM2N_OLin3BJunPQ6kPO2gsTPPAuy_zcwLE&usqp=CAU"
                alt="Beginner Level Icon"
                className="w-full h-full object-cover object-center shadow-lg rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
