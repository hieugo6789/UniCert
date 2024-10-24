import { Link, useNavigate, useParams } from "react-router-dom";
import { allJobPaginationData } from "../../../models/jobPosition";
import { useEffect, useState } from "react";
import useJobDetail from "../../../hooks/JobPosition/useJobDetail";
import CustomButton from "../../../components/UI/CustomButton";
interface certTab {
  certCode: string;
  certDescription: string;
  certId: number;
  certImage: string;
  certName: string;
  typeName: string;
}
const JobDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState<allJobPaginationData | null>(null);
  const { state, getJobDetails } = useJobDetail();
  const [certList, setCertList] = useState<certTab[]>([]);
  useEffect(() => {
    setCertList([]);
    getJobDetails(id);
    return;
  }, [id]);

  useEffect(() => {
    if (state) {
      setJobDetail(state?.currentJob);

      setCertList(state?.currentJob?.certificationDetails);
    }
  }, [state]);

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
    <div className=" bg-gray-900">
      <p className="fade-in ml-2 pt-2 font-bold cursor-pointer text-blue-800">
        {" "}
        <Link to="/">Home </Link>
        {">"} <Link to="/job">Job Position</Link> {">"}{" "}
        {jobDetail?.jobPositionName}
      </p>
      {/* header - title */}
      <div className="w-full min-h-36  p-10 text-center">
        <h1
          className={`fade-in uppercase text-8xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient`}
        >
          {jobDetail?.jobPositionName || "Không tìm thấy khóa học"}
        </h1>
        <h2 className="fade-in text-white text-5xl font-bold mt-5 text-center">
          What's {jobDetail?.jobPositionName || "____"}
        </h2>
        {/* <p className="text-white text-2xl font-bold mt-5 text-center">{jobDetail?.jobPositionDescription || "____"}</p> */}
        <div
          className="fade-in prose list-disc whitespace-pre-wrap text-white text-3xl mt-5 text-center"
          dangerouslySetInnerHTML={{
            __html: jobDetail?.jobPositionDescription || "",
          }}
        />
      </div>
      <div></div>

      {/* Thông tin chung */}
      {/* Certificate hiện có */}
      <div className="grid grid-cols-2 grid-rows-2 text-center min-h-screen gap-10 px-10">
        <div className="p-5 fade-in bg-gray-700 bg-opacity-30 rounded-lg shadow-lg">
          <h1 className="uppercase text-2xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
            1. Foundation
          </h1>
          <p className="text-white text-xl mb-4 font-bold">
            Knowledge-based certification for foundational understanding.
          </p>
          {certList &&
          certList.filter((cert) => cert.typeName === "Foundation").length ===
            0 ? (
            <p className="text-xl text-white">
              Not found any Associate certificate
            </p>
          ) : null}
          {certList &&
            certList.map((cert) => {
              if (cert.typeName === "Foundation") {
                return (
                  <div className="w-32 h-32 m-auto">
                    <img
                      src={cert.certImage}
                      alt={cert.certName}
                      className="hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => navigate("/certificate/" + cert.certId)}
                    />
                  </div>
                );
              }
            })}
        </div>
        <div className="p-5 fade-in bg-gray-700 bg-opacity-30 rounded-lg shadow-lg">
          <h1 className="uppercase text-2xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
            2. Associate
          </h1>
          <p className="text-white text-xl mb-4 font-bold">
            Certification for those with basic skills and applied knowledge.
          </p>
          {certList &&
          certList.filter((cert) => cert.typeName === "Associate").length ===
            0 ? (
            <p className="text-xl text-white">
              Not found any Associate certificate
            </p>
          ) : null}
          {certList &&
            certList.map((cert) => {
              if (cert.typeName === "Associate") {
                return (
                  <div className="w-32 h-32 m-auto">
                    <img
                      src={cert.certImage}
                      alt={cert.certName}
                      className="hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => navigate("/certificate/" + cert.certId)}
                    />
                  </div>
                );
              }
            })}
        </div>
        <div className="p-5 fade-in bg-gray-700 bg-opacity-30 rounded-lg shadow-lg">
          <h1 className="uppercase text-2xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
            3. Professional
          </h1>
          <p className="text-white text-xl mb-4 font-bold">
            Certification for professionals with advanced expertise.
          </p>
          {certList &&
          certList.filter((cert) => cert.typeName === "Professional").length ===
            0 ? (
            <p className="text-xl text-white">
              Not found any Associate certificate
            </p>
          ) : null}
          {certList &&
            certList.map((cert) => {
              if (cert.typeName === "Professional") {
                return (
                  <div className="w-32 h-32 m-auto">
                    <img
                      src={cert.certImage}
                      alt={cert.certName}
                      className="hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => navigate("/certificate/" + cert.certId)}
                    />
                  </div>
                );
              }
            })}
        </div>
        <div className="p-5 fade-in bg-gray-700 bg-opacity-30 rounded-lg shadow-lg">
          <h1 className="uppercase text-2xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
            4. Expert
          </h1>
          <p className="text-white text-xl mb-4 font-bold">
            Certification for experts who demonstrate mastery in the field.
          </p>
          {certList &&
          certList.filter((cert) => cert.typeName === "Expert").length === 0 ? (
            <p className="text-xl text-white">
              Not found any Associate certificate
            </p>
          ) : null}
          {certList &&
            certList.map((cert) => {
              if (cert.typeName === "Expert") {
                return (
                  <div className="w-32 h-32 m-auto">
                    <img
                      src={cert.certImage}
                      alt={cert.certName}
                      className="hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => navigate("/certificate/" + cert.certId)}
                    />
                  </div>
                );
              }
            })}
        </div>
        <div className="p-5 fade-in bg-gray-700 bg-opacity-30 rounded-lg shadow-lg">
          <h1 className="uppercase text-2xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
            5. Specialty
          </h1>
          <p className="text-white text-xl mb-4 font-bold">
            Certification focused on specialized skills in a specific area of expertise.
          </p>
          {certList &&
          certList.filter((cert) => cert.typeName === "Specialty").length ===
            0 ? (
            <p className="text-xl text-white">
              Not found any Associate certificate
            </p>
          ) : null}
          {certList &&
            certList.map((cert) => {
              if (cert.typeName === "Specialty") {
                return (
                  <div className="w-32 h-32 m-auto">
                    <img
                      src={cert.certImage}
                      alt={cert.certName}
                      className="hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => navigate("/certificate/" + cert.certId)}
                    />
                  </div>
                );
              }
            })}
        </div>
        <div className="m-auto fade-in">
          <CustomButton
            shining
            label="Get more certificate"
            onClick={() => navigate("/certificate")}
            className="bg-red-500 fade-in"
          />
        </div>
      </div>
      {/* Tầm quan trọng của certificate */}
      <div>
        <h1>Why should get Certificate?</h1>
      </div>
    </div>
  );
};

export default JobDetail;
