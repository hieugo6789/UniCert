import { useEffect, useState } from "react";
import { allCertificationData } from "../../models/certificate";
import { allExamPaginationData } from "../../models/simulationExam";
import ExamSimulaCard from "../Exam/ExamSimulaCard";
import Loading from "../UI/Loading";
import useExamByCertId from "../../hooks/SimulationExam/useExamByCertId";

const ExamDetails = (props: allCertificationData) => {
  const [exams, setExams] = useState<allExamPaginationData[]>([]);
  const { exam, loading, refetchExams } = useExamByCertId(props.certId);
  useEffect(() => {
    const fetchExams = async () => {
      setExams([]);
      refetchExams(props.certId);
      // setExams(exam);
    };
    fetchExams();
  }, [props.certId]);
  useEffect(() => {
    setExams(exam);
  }, [exam]);
  return (
    <>

      <h1 className="text-2xl font-semibold text-gray-800 text-center">Exam Details</h1>
      <p className="text-gray-500 mb-4 text-center">
        Here are the simulation exams for the certification.
      </p>
      {exam.length === 0 && (
        <p className="text-gray-500">No simulation exams available.</p>
      )}
      <div>
        {/* Responsive grid layout with dynamic column counts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {exams.map((exam) => (
            <ExamSimulaCard key={exam.examId} {...exam} />
          ))}
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};


export default ExamDetails;

