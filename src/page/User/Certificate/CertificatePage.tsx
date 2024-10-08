
import CertificateCard from "../../../components/Certifications/CertificateCard";
import defaultCertThumb from '../../../assets/images/Certification/defaultCertThumb.png'
const CertificatePage = () => {
  const certificates = [
    { title: "International Software Testing Qualifications Board", organization: "ISTQB Việt Nam", expiration: "No expiration" },
    { title: "International Software Testing Qualifications Board", organization: "ISTQB Việt Nam", expiration: "No expiration" },
    { title: "International Software Testing Qualifications Board", organization: "ISTQB Việt Nam", expiration: "No expiration" },
    { title: "International Software Testing Qualifications Board", organization: "ISTQB Việt Nam", expiration: "No expiration" },
    { title: "International Software Testing Qualifications Board", organization: "ISTQB Việt Nam", expiration: "No expiration" },
    { title: "International Software Testing Qualifications Board", organization: "ISTQB Việt Nam", expiration: "No expiration" },
    { title: "International Software Testing Qualifications Board", organization: "ISTQB Việt Nam", expiration: "No expiration" },
    { title: "International Software Testing Qualifications Board", organization: "ISTQB Việt Nam", expiration: "No expiration" },
  ];
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-purple-500 p-6 text-center text-white text-2xl font-bold">
        Take your career to the next level with certificates
      </header>

      {/* Filter Section */}
      <div className="p-4 text-center">
        <div className="inline-block flex flex-row items-center">
          <p className="mr-3">Filter by</p>
          
          <div>
            <label className="sr-only">Currency</label>
            <select id="currency" name="currency" className=" mr-3 h-full bg-white rounded-md border-0 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
              <option>Major</option>
            </select>
          </div>
          <div>
            <label className="sr-only">Currency</label>
            <select id="currency" name="currency" className="h-full bg-white rounded-md border-0 py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
              <option>Job Position</option>
            </select>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {certificates.map((cert, index) => (
          <CertificateCard
            key={index}
            title={cert.title}
            organization={cert.organization}
            expiration={cert.expiration}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center p-4">
        <button className="mr-2">{"<"}</button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button key={page} className="mx-1 px-3 py-1 border rounded-full bg-purple-500 text-white">
            {page}
          </button>
        ))}
        <button className="ml-2">{">"}</button>
      </div>

      {/* Designed for working adults section */}
      <div className="bg-white p-6 shadow-md flex flex-row items-center">
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-center">Designed for working adults</h2>
          <p className="text-gray-600 mb-8 text-center">
            Enroll in flexible, 100% online degree programs. Set your own schedule to balance your work and personal commitments and complete coursework at your own pace.
          </p>
        </div>
        <div className="flex w-1/2 justify-end space-x-6">
          <CertificateCard title="Business" organization="Harvard University" expiration="No expiration" />
          <CertificateCard title="Business" organization="Harvard University" expiration="No expiration" />
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="p-6 mt-6 bg-violet-200">
        <h3 className="text-center text-xl mb-4 font-bold">Hear why students enjoy learning</h3>
        <div className="flex justify-center">
          <div className="w-3/4 bg-white p-4 shadow-md rounded-lg flex flex-row items-center">
            <div className="w-1/2 mr-5 ">
            <img src={defaultCertThumb} className="w-full h-full" />
            </div>
            <p className="w-1/2">
              Live sessions, office hours, discussion boards—you can participate from wherever you are. Getting my MBA makes me feel empowered. I don’t need to stop working, I don’t need to stop being a mother, I don’t need to stop having my life.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificatePage
