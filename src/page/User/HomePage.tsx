import { useEffect, useState } from "react";
import CustomCarousel from "../../components/Carousel/CustomCarousel";
import BannerCard from "../../components/UI/BannerCard";
import { allCertificationData } from "../../models/certificate";
import CertificateCard from "../../components/Certifications/CertificateCard";
import CustomButton from "../../components/UI/CustomButton";

const HomePage = () => {
  const [topCert] = useState<allCertificationData[]>([
    {
      certId: "1",
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
      certId: "2",
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
      certId: "3",
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
      certId: "4",
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
          <CustomButton label="Read more about us" shining onClick={() => null} className="w-1/2 mt-5 mb-5" />
        </div>
      </div>

      <div className="text-center font-bold text-6xl mt-20">
        <h1 className="mb-5 text-center font-bold text-6xl mt-10 fade-in">
          Best Certificate For You
        </h1>

        <div className="flex w-full grid grid-cols-1 gap-2 md:grid-cols-1 xs:grid-cols:2 xl:grid-cols-4">
          {topCert.map((cert) => (
            <div className="fade-in">
              <CertificateCard {...cert} />
            </div>
          ))}
        </div>

        <div className="px-20 fade-in">
          <CustomButton label="Get More Certificate" shining onClick={() => null} className="w-1/2 mt-5 mb-5" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
