import { useEffect, useState } from "react";
import SimulationExamSidebar from "../../../components/Exam/SimulationExamSidebar";
import QuestionCard from "../../../components/Exam/QuestionCard";
import useExamDetail from "../../../hooks/SimulationExam/useExamDetail";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { showToast } from '../../../utils/toastUtils';
import useExamEnrollment from '../../../hooks/Enrollment/useExam';
import EssayQuestion from "./EssayQuestion";

type Answer = {
  questionId: number;
  userAnswerId: number[];
  essayAnswer?: string;
};

type Question = {
  id: number;
  questionText: string;
  questionType: string;
  options?: {
    answerId: number;
    answerText: string;
  }[];
  correctAnswerId: number;
  essayAnswer?: string;
}

const SimulationExamPage = () => {
  const id = Number(useParams().id || 0);
  const userId = Cookies.get("userId");
  const [questions, setQuestions] = useState<Question[]>([]);
  const { state, getExamDetails } = useExamDetail();
  const [duration, setDuration] = useState(0);
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);
  const { examEnrollment, refetchExamEnrollments } = useExamEnrollment({ userId: userId || "" });
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const fetchExamDetails = async () => {
      await getExamDetails(id);
    };
    fetchExamDetails();
  }, [id]);

  useEffect(() => {
    if (!userId) {
      showToast("Please login to access this page", "error");
      navigate('/login');
      return;
    }
    refetchExamEnrollments(userId || "");
  }, [userId]);

  useEffect(() => {
    const checkExamPurchase = () => {
      const purchased = examEnrollment.some(
        (e) => e.examEnrollmentStatus === "Completed" &&
          e.simulationExamDetail.some(
            (simExam) => simExam.examId === Number(id)
          )
      );
      console.log("Test", purchased);
      setIsPurchased(purchased);
    };

    checkExamPurchase();
  }, [userId, id, examEnrollment]);

  useEffect(() => {
    if (isInitialized || !state?.currentExam?.listQuestions) {
      return;
    }

    setDuration(state.currentExam.duration);
    const questionCount = state.currentExam.questionCount;

    if (location.state?.formattedAnswers?.length > 0) {
      const formattedAnswers = location.state.formattedAnswers;
      const allQuestions = state.currentExam.listQuestions;

      const orderedQuestions = formattedAnswers.map((answer: any) => {
        const question = allQuestions.find((q: any) => q.questionId === answer.questionId);

        if (!question) {
          return null;
        }

        if (question.questionType === 'Essay') {
          return {
            id: question.questionId,
            questionText: question.questionName,
            questionType: 'Essay',
            essayAnswer: question.answers[0]?.answerText || '',
            correctAnswerId: -1
          };
        }

        const shuffledAnswers = [...(question.answers ?? [])].sort(() => Math.random() - 0.5);
        const correctAnswer = question.answers.find((a: any) => a.isCorrect)?.answerId || -1;

        return {
          id: question.questionId,
          questionText: question.questionName,
          questionType: 'Choice',
          options: shuffledAnswers.map((answer: any) => ({
            answerId: answer.answerId,
            answerText: answer.answerText,
          })),
          correctAnswerId: correctAnswer,
        };
      });

      setQuestions(orderedQuestions.filter((q: any): q is Question => q !== null));

    } else {
      const allQuestions = state.currentExam.listQuestions;
      const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffledQuestions.slice(0, questionCount);

      const formattedQuestions = selectedQuestions.map((q: any) => {
        if (q.questionType === 'Essay') {
          return {
            id: q.questionId,
            questionText: q.questionName,
            questionType: 'Essay',
            essayAnswer: q.answers[0]?.answerText || '',
            correctAnswerId: -1
          };
        }

        const shuffledAnswers = [...q.answers].sort(() => Math.random() - 0.5);
        const correctAnswer = q.answers.find((a: any) => a.isCorrect)?.answerId || -1;

        return {
          id: q.questionId,
          questionText: q.questionName,
          questionType: 'Choice',
          options: shuffledAnswers.map((answer: any) => ({
            answerId: answer.answerId,
            answerText: answer.answerText,
          })),
          correctAnswerId: correctAnswer,
        };
      });

      setQuestions(formattedQuestions);
    }

    setIsInitialized(true);
  }, [state, location.state, isInitialized]);


  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>(Array(questions.length).fill(false));

  const handleFlagQuestion = (questionIndex: number) => {
    const newFlags = [...flaggedQuestions];
    newFlags[questionIndex] = !newFlags[questionIndex];
    setFlaggedQuestions(newFlags);
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[][]>(Array(questions.length).fill([]));
  const [essayAnswers, setEssayAnswers] = useState<string[]>(() => {
    if (location.state?.essayAnswers) {
      return location.state.essayAnswers;
    }
    return Array(questions.length).fill('');
  });

  const handleSelectAnswer = (questionIndex: number, answerId: number | string) => {
    if (questions[questionIndex].questionType === 'Essay') {
      const newEssayAnswers = [...essayAnswers];
      newEssayAnswers[questionIndex] = answerId as string;
      setEssayAnswers(newEssayAnswers);
    } else {
      const newAnswers = [...selectedAnswers];
      const currentAnswers = newAnswers[questionIndex] || [];
      const answerIndex = currentAnswers.indexOf(answerId as number);

      if (answerIndex === -1) {
        newAnswers[questionIndex] = [...currentAnswers, answerId as number];
      } else {
        newAnswers[questionIndex] = currentAnswers.filter(id => id !== answerId);
      }
      setSelectedAnswers(newAnswers);
    }
  };

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (timeLeft === 0) {
      alert("Time's up!");
      return;
    }

    if (timeLeft !== null) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime as number) - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formattedAnswers: Answer[] = location.state?.formattedAnswers || [];

  useEffect(() => {
    if (formattedAnswers.length > 0 && questions.length > 0) {
      const newSelectedAnswers = questions.map((question) => {
        if (question.questionType === 'Essay') return [];
        const matchingAnswer = formattedAnswers.find(
          (answer) => answer.questionId === question.id
        );
        return matchingAnswer ? matchingAnswer.userAnswerId : [];
      });
      setSelectedAnswers(newSelectedAnswers);

      // Restore essay answers
      const newEssayAnswers = questions.map((question) => {
        if (question.questionType === 'Essay') {
          const matchingAnswer = formattedAnswers.find(
            (answer) => answer.questionId === question.id
          );
          return matchingAnswer?.essayAnswer || '';
        }
        return '';
      });
      setEssayAnswers(newEssayAnswers);
    }
  }, [formattedAnswers, questions]);

  useEffect(() => {
    if (location.state?.timeLeft) {
      setTimeLeft(location.state.timeLeft);
    } else if (duration > 0) {
      setTimeLeft(duration * 60);
    }
  }, [location.state?.timeLeft, duration]);

  const navigate = useNavigate();

  const handleSubmitExam = () => {
    const formattedAnswers = questions.map((question, index) => ({
      questionId: question.id,
      userAnswerId: question.questionType === 'Essay' ? [] : (selectedAnswers[index] || []),
      essayAnswer: question.questionType === 'Essay' ? essayAnswers[index] : undefined
    }));

    navigate("/exam/" + id + "/simulation/submit", {
      state: {
        formattedAnswers,
        timeLeft,
        essayAnswers
      }
    });
  };

  const handleClearAnswer = (questionIndex: number) => {
    if (questions[questionIndex].questionType === 'Essay') {
      const newEssayAnswers = [...essayAnswers];
      newEssayAnswers[questionIndex] = '';
      setEssayAnswers(newEssayAnswers);
    } else {
      const newAnswers = [...selectedAnswers];
      newAnswers[questionIndex] = [];
      setSelectedAnswers(newAnswers);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  // cuộn tự động khi chuyển trang
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);
  const questionsPerPage = 5;

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  if (!isPurchased) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Please Purchase This Exam First</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">You need to purchase this exam before you can access its details.</p>
          <button
            onClick={() => navigate("/certificate")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col p-4 w-full xl:col-span-4 pb-32 xl:pb-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Time Remaining</h2>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            {timeLeft !== null ? formatTime(timeLeft) : "Loading..."}
          </div>
        </div>
        <div className="flex flex-col">
          {currentQuestions.map((question, index) => (
            question.questionType === 'Choice' ? (
              <QuestionCard
                key={question.id}
                question={question}
                currentQuestionIndex={(currentPage - 1) * questionsPerPage + index}
                selectedAnswer={selectedAnswers[(currentPage - 1) * questionsPerPage + index]}
                flagged={flaggedQuestions[(currentPage - 1) * questionsPerPage + index]}
                onFlag={() => handleFlagQuestion((currentPage - 1) * questionsPerPage + index)}
                onSelectAnswer={(answerId) =>
                  handleSelectAnswer((currentPage - 1) * questionsPerPage + index, answerId)
                }
                onClearAnswer={() => handleClearAnswer((currentPage - 1) * questionsPerPage + index)}
              />
            ) : (
              <EssayQuestion
                key={question.id}
                question={question}
                currentQuestionIndex={(currentPage - 1) * questionsPerPage + index}
                selectedAnswer={essayAnswers[(currentPage - 1) * questionsPerPage + index]}
                flagged={flaggedQuestions[(currentPage - 1) * questionsPerPage + index]}
                onFlag={() => handleFlagQuestion((currentPage - 1) * questionsPerPage + index)}
                onSelectAnswer={(answer) =>
                  handleSelectAnswer((currentPage - 1) * questionsPerPage + index, answer)
                }
                onClearAnswer={() => handleClearAnswer((currentPage - 1) * questionsPerPage + index)}
              />
            )
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            className={`px-4 py-2 rounded-lg ${currentPage > 1
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {/* <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-lg ${page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div> */}
          <button
            className={`px-4 py-2 rounded-lg ${currentPage < totalPages
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className="w-full col-span-1 pr-4">
        <SimulationExamSidebar
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          selectedAnswers={selectedAnswers}
          essayAnswers={essayAnswers}
          flaggedQuestions={flaggedQuestions}
          visibleQuestionIndexes={currentQuestions.map((q) => q.id)}
          handleSubmitExam={handleSubmitExam}
          setCurrentPage={setCurrentPage} // Điều hướng đến trang
          questionsPerPage={questionsPerPage} // Số câu hỏi mỗi trang
        />

      </div>


    </div>

  );
};

export default SimulationExamPage;
