import { useEffect, useState } from "react";
import CustomCarousel from "../../components/Carousel/CustomCarousel";
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="relative w-full">
        <div className="fade-in">
          <CustomCarousel />
        </div>
      </div>

      <div className="bg-gray-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-center fade-in uppercase text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient mb-8 md:mb-16`}>
            Why Choose UniCert?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 px-2 md:px-4">
            {/* Why Get Certified Card */}
            <div 
              onClick={() => scrollToSection('global-recognition-section')}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg fade-in transform hover:scale-105 transition duration-300 cursor-pointer hover:shadow-2xl"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-purple-800 text-center">Why Get Certified?</h3>
              <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">Discover how our certifications can enhance your career prospects and professional growth.</p>
            </div>

            {/* Best Certificates Card */}
            <div 
              onClick={() => scrollToSection('expert-support-section')}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg fade-in transform hover:scale-105 transition duration-300 cursor-pointer hover:shadow-2xl"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-800 text-center">Best Certificates</h3>
              <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">Explore our curated selection of industry-leading certifications for your career path.</p>
            </div>

            {/* Exam Preparation Card */}
            <div 
              onClick={() => scrollToSection('practice-tests-section')}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg fade-in transform hover:scale-105 transition duration-300 cursor-pointer hover:shadow-2xl"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-green-800 text-center">Exam Preparation</h3>
              <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">Comprehensive study materials and practice tests to ensure your success.</p>
            </div>

            {/* Learning Pathway Card */}
            <div 
              onClick={() => scrollToSection('flexible-learning-section')}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg fade-in transform hover:scale-105 transition duration-300 cursor-pointer hover:shadow-2xl"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-red-800 text-center">Learning Pathway</h3>
              <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">Follow our structured learning path from beginner to expert certification levels.</p>
            </div>
          </div>
        </div>
      </div>

      <section id="global-recognition-section" className="py-12 md:py-16 lg:py-20">
        <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className={`mt-6 md:mt-10 text-center fade-in uppercase text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient`}>
            Why Should You Get Certified With
          </h1>
          <h1 className="text-blue-700 fade-in text-4xl md:text-6xl lg:text-7xl font-extrabold mt-2">UniCert?</h1>
          <p className="text-lg md:text-xl font-thin w-full md:w-4/5 lg:w-2/3 mx-auto mt-6 md:mt-8 fade-in">
            UniCert is your go-to platform for certifications, offering a comprehensive collection of globally recognized certifications tailored for university students. Certifications like <strong>ISTQB</strong>, <strong>CompTIA A+</strong>, <strong>CCNA</strong>, and <strong>CISSP</strong> can significantly boost your career, and UniCert makes it easier than ever to explore these paths.
            <br /><br />
            Our platform provides all the essential details — from exam schedules to costs and prerequisites — so you can make informed decisions. Plus, we offer <strong>mock tests</strong> to simulate the real exam environment, helping you feel fully prepared.
            <br /><br />
            With UniCert, you’ll benefit from a user-friendly portal, access to top certifications, and resources designed to guide you through every step of your certification journey.
          </p>
          <div className="px-4 md:px-20 fade-in mt-8">
            <CustomButton
              label="Read more about us"
              shining
              onClick={() => navigate("/about")}
              className="w-full md:w-1/2 py-3 md:py-4"
            />
          </div>
        </div>
      </section>

      <section id="expert-support-section" className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className={`text-center fade-in uppercase text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] mb-8 md:mb-12`}>
            Best Certificate For You
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {topCert.map((cert) => (
              <div key={cert.certId} className="fade-in transform hover:scale-105 transition duration-300">
                <CertificateCard {...cert} />
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-12 text-center">
            <CustomButton
              label="Get More Certificate"
              shining
              onClick={() => navigate("/certificate")}
              className="w-full max-w-xs md:max-w-md mx-auto py-3 md:py-4"
            />
          </div>
        </div>
      </section>

      <section id="practice-tests-section" className="py-12 md:py-16 lg:py-20">
        <div className="w-full flex flex-col text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className={`text-center fade-in uppercase text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))]`}>
              Prepare for Your Certification Exams
            </h1>
            <p className="mt-6 md:mt-8 text-lg md:text-xl max-w-4xl mx-auto">
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
              className="w-full md:w-1/2 lg:w-1/3 mt-8 md:mt-10 mx-auto py-3 md:py-4 fade-in"
            />
          </div>
        </div>
      </section>

      <section id="flexible-learning-section" className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className={`text-center fade-in uppercase text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))]`}>
            Unicert's Learning Pathway
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 text-center py-8 md:py-12 lg:py-16">
            <div className="p-4 md:p-6 bg-gray-200 rounded-lg shadow-md fade-in">
              <h2 className="text-lg md:text-xl font-bold">Beginner</h2>
              <p className="mt-2">Step 1: Lay the foundations</p>
              <div className="m-auto w-full h-48 md:h-64 mt-4 fade-in">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1VRZFDf95Gk6XvurWkFVvRMoleYLfCsGVAQ&s"
                  alt="Beginner Level Icon"
                  className="w-full h-full object-cover object-center shadow-lg rounded-lg"
                />
              </div>
            </div>

            <div className="p-4 md:p-6 bg-blue-200 rounded-lg shadow-md fade-in">
              <h2 className="text-lg md:text-xl font-bold">Associate</h2>
              <p className="mt-2">Step 2: Build proficiency</p>
              <div className="m-auto w-full h-48 md:h-64 mt-4 fade-in">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUBgqiBtKaMUnKxr7VDl_hKYpCtYfDC-xjJ6XufsdZ1xVQfoXXySVnov6szllMXwQS1O4&usqp=CAU"
                  alt="Beginner Level Icon"
                  className="w-full h-full object-cover object-center shadow-lg rounded-lg"
                />
              </div>
            </div>

            <div className="p-4 md:p-6 bg-green-200 rounded-lg shadow-md fade-in">
              <h2 className="text-lg md:text-xl font-bold">Professional</h2>
              <p className="mt-2">Step 3: Achieve expertise</p>
              <div className="m-auto w-full h-48 md:h-64 mt-4 fade-in">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWeISxrDQVThFaKuzfzee64rgTQAauQpj5YQSWTD0gzPnZRJKXAv1y7-qDU9RjDYt2mNU&usqp=CAU"
                  alt="Beginner Level Icon"
                  className="w-full h-full object-cover object-center shadow-lg rounded-lg"
                />
              </div>
            </div>

            <div className="p-4 md:p-6 bg-purple-200 rounded-lg shadow-md fade-in">
              <h2 className="text-lg md:text-xl font-bold">Specialty</h2>
              <p className="mt-2">Step 4: Mastery in a niche</p>
              <div className="m-auto w-full h-48 md:h-64 mt-4 fade-in">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEzpN_mvC7EOdgx-HkhAYLjgNdSaByXzhzOM2N_OLin3BJunPQ6kPO2gsTPPAuy_zcwLE&usqp=CAU"
                  alt="Beginner Level Icon"
                  className="w-full h-full object-cover object-center shadow-lg rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
