import { useState } from "react";
import Description from "../../../components/Certifications/Description";
import certificationDefault from "../../../assets/images/Certification/certificationDefault.png";
import Feedback from "../../../components/Certifications/Feedback";
import ExamDetails from "../../../components/Certifications/ExamDetails";
const CertificateDetailPage = () => {
  const [activeTab, setActiveTab] = useState('Description');

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center bg-purple-600 p-8 rounded-lg shadow-lg">
      
      {/* Left Section */}
      <div className="text-left text-white">
        <img src={certificationDefault} alt="" className="w-1/2"/>
        <h1 className="text-2xl font-bold">International Software Testing Qualifications Board</h1>
        <p className="text-lg mt-2">Fee: 10 points for one attempt</p>
        
        <div className="mt-4 flex space-x-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Take Exam
          </button>
          <button className="bg-white text-blue-500 py-2 px-4 rounded-md flex items-center space-x-2 hover:bg-gray-200">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l1 10h13l1-10h2M16 13v6a1 1 0 001 1h1a1 1 0 001-1v-6M7 13v6a1 1 0 001 1h1a1 1 0 001-1v-6" />
            </svg>
            <span>Add to cart</span>
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-white p-6 rounded-lg shadow-md text-black max-w-xs">
        <h2 className="text-xl font-bold">ISTQB Certified Tester Foundation Level (CTFL) v4.0</h2>
        <p className="mt-2">Gain essential knowledge in software testing</p>
        <hr className="my-2" />
        <p><strong>Foundation level:</strong> Recommended experience</p>
        <p><strong>Globally recognized certification</strong></p>
        <p className="mt-2"><strong>Expire:</strong></p>
        <a href="#" className="text-blue-500 mt-4 block hover:underline">Learn More</a>
      </div>
      
    </div>
      <div className="flex border-b-2 border-gray-200">
        {['Description', 'Exam Details', 'Feedback'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-2 transition-colors duration-300 ${
              activeTab === tab ? 'border-b-4 border-blue-500 text-blue-500' : ''
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === 'Description' && <Description />}
        {activeTab === 'Exam Details' && <ExamDetails />}
        {activeTab === 'Feedback' && <Feedback />}
      </div>
    </div>)
};
export default CertificateDetailPage;
