import { useEffect, useState } from "react";
import CustomCarousel from "../../components/Carousel/CustomCarousel";
import BannerCard from "../../components/UI/BannerCard";
import { allCertificationData } from "../../models/certificate";
import CertificateCard from "../../components/Certifications/CertificateCard";
import CustomButton from "../../components/UI/CustomButton";
// import Banner1 from "../../assets/images/Banner/Banner1.png";
const HomePage = () => {
  const [topCert] = useState<allCertificationData[]>([
    {
      certId: 1,
      certName: "AWS Certified Developer",
      certCode: "AWS-CD",
      certDescription:
        "The AWS Certified Developer – Associate examination is intended for individuals who perform a development role and have one or more years of hands-on experience developing and maintaining an AWS-based application.",
      certCost: 150,
      certPointSystem: "AWS",
      certImage: "",
      certValidity: "3 years",
      organizeId: 6,
      organizeName: "Amazon Web Services",
      typeId: 8,
      typeName: "Associate",
      certPrerequisiteId: [],
      certPrerequisite: [],
      certCodePrerequisite: [],
      certDescriptionPrerequisite: [],
    },
    {
      certId: 2,
      certName: "AWS Certified Developer",
      certCode: "AWS-CD",
      certDescription:
        "The AWS Certified Developer – Associate examination is intended for individuals who perform a development role and have one or more years of hands-on experience developing and maintaining an AWS-based application.",
      certCost: 150,
      certPointSystem: "AWS",
      certImage: "",
      certValidity: "3 years",
      organizeId: 6,
      organizeName: "Amazon Web Services",
      typeId: 8,
      typeName: "Associate",
      certPrerequisiteId: [],
      certPrerequisite: [],
      certCodePrerequisite: [],
      certDescriptionPrerequisite: [],
    },
    {
      certId: 3,
      certName: "AWS Certified Developer",
      certCode: "AWS-CD",
      certDescription:
        "The AWS Certified Developer – Associate examination is intended for individuals who perform a development role and have one or more years of hands-on experience developing and maintaining an AWS-based application.",
      certCost: 150,
      certPointSystem: "AWS",
      certImage: "",
      certValidity: "3 years",
      organizeId: 6,
      organizeName: "Amazon Web Services",
      typeId: 8,
      typeName: "Associate",
      certPrerequisiteId: [],
      certPrerequisite: [],
      certCodePrerequisite: [],
      certDescriptionPrerequisite: [],
    },
    {
      certId: 4,
      certName: "AWS Certified Developer",
      certCode: "AWS-CD",
      certDescription:
        "The AWS Certified Developer – Associate examination is intended for individuals who perform a development role and have one or more years of hands-on experience developing and maintaining an AWS-based application.",
      certCost: 150,
      certPointSystem: "AWS",
      certImage: "",
      certValidity: "3 years",
      organizeId: 6,
      organizeName: "Amazon Web Services",
      typeId: 8,
      typeName: "Associate",
      certPrerequisiteId: [],
      certPrerequisite: [],
      certCodePrerequisite: [],
      certDescriptionPrerequisite: [],
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
        <h1 className="mb-5 fade-in">Why Should You Get Certified With</h1>
        <h1 className="text-blue-700 fade-in">UniCert?</h1>
        <p className="text-xl font-thin w-2/3 m-auto fade-in">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id
          eleifend urna, quis dapibus justo. Nam molestie ultrices fermentum. In
          maximus at ipsum non gravida. Interdum et malesuada fames ac ante
          ipsum primis in faucibus. Morbi sodales blandit turpis, vitae rutrum
          arcu fermentum a. Donec magna erat, sodales sit amet luctus eget,
          varius et metus. Phasellus nec est pellentesque, convallis felis
          faucibus, egestas tortor. Ut scelerisque nisi sit amet imperdiet
          condimentum. Sed eget risus sit amet est maximus rutrum.
        </p>
        <div className="px-20 fade-in">
          <CustomButton
            label="Read more about us"
            shining
            onClick={() => null}
            className="w-1/2 mt-5 mb-5"
          />
        </div>
      </div>

      <div className="text-center font-bold text-6xl mt-20">
        <h1 className="mb-5 text-center font-bold text-6xl mt-10 fade-in">
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
            onClick={() => null}
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
            Easy to take exam
          </h1>
          <p className="pt-2 text-sm lg:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a
            facilisis odio. Fusce interdum magna sapien, et porttitor quam
            egestas a. Suspendisse eget mauris ultricies, iaculis tellus ac,
            bibendum tellus. Donec gravida orci ac consequat placerat. Cras et
            porta enim. Nulla a dapibus ligula. Donec sem nunc, malesuada
            sagittis tortor eget, faucibus dapibus risus. Sed laoreet, nunc eget
            ultricies finibus, nunc diam pulvinar turpis, quis maximus dui velit
            ut sapien. Pellentesque non condimentum velit. Mauris felis sapien,
            viverra at faucibus id, pretium at magna. Quisque sed cursus tortor.
            Ut et felis maximus, ultrices ligula vel, aliquam erat. Duis
            placerat neque eu felis convallis finibus. Nam laoreet placerat
            mauris, vitae suscipit nisl vestibulum id.
          </p>
          <CustomButton
            label="Take Exam"
            shining
            onClick={() => null}
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
