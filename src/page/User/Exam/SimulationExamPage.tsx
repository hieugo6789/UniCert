import { useEffect, useState } from "react";
import SimulationExamSidebar from "../../../components/Exam/SimulationExamSidebar";
import QuestionCard from "../../../components/Exam/QuestionCard";
import CustomButton from "../../../components/UI/CustomButton";
import useExamDetail from "../../../hooks/SimulationExam/useExamDetail";
import { useParams } from "react-router-dom";

const SimulationExamPage = () => {
  const id = Number(useParams().id || 0);
  const [questions, setQuestions] = useState<any[]>([]);
  const { state, getExamDetails } = useExamDetail();

  useEffect(() => {
    const fetchExamDetails = async () => {
      await getExamDetails(id);
    };
    fetchExamDetails();
  }, [id]);

  useEffect(() => {
    if (state && state.currentExam && state.currentExam.listQuestions) {
      const formattedQuestions = state.currentExam.listQuestions.map((q: any) => ({
        id: q.questionId,
        questionText: q.questionName,
        options: q.answers.map((answer: any) => ({
          answerId: answer.answerId, // Include the actual answer ID
          answerText: answer.answerText,
        })),
        correctAnswerId: -1, // Default if correct answer ID is unknown
      }));
      setQuestions(formattedQuestions);
      console.log(formattedQuestions);
    }
  }, [state]);

  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>(Array(questions.length).fill(false));

  const handleFlagQuestion = (questionIndex: number) => {
    const newFlags = [...flaggedQuestions];
    newFlags[questionIndex] = !newFlags[questionIndex];
    setFlaggedQuestions(newFlags);
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));

  const handleSelectAnswer = (questionIndex: number, answerId: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerId; // Store the answerId
    setSelectedAnswers(newAnswers);
  };

  const timer = 600;
  const [timeLeft, setTimeLeft] = useState(timer);

  useEffect(() => {
    if (timeLeft === 0) {
      alert("Time's up!");
      return;
    }
    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 min-h-screen bg-gray-100">
      <div className="flex flex-col p-4 w-full xl:col-span-4">
        <div className="bg-gray-100 p-4 mb-4">
          <h2 className="text-lg font-bold">Time Left</h2>
          <div className="text-4xl font-bold">{formatTime(timeLeft)}</div>
        </div>
        {questions[currentQuestionIndex] && (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            flagged={flaggedQuestions[currentQuestionIndex]}
            onFlag={() => handleFlagQuestion(currentQuestionIndex)}
            onSelectAnswer={(answerId) => handleSelectAnswer(currentQuestionIndex, answerId)}
          />
        )}
        <div className="flex items-center justify-between">
          <CustomButton
            className="mt-4"
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
              }
            }}
            label="Previous Question"
          />
          <CustomButton
            className="mt-4"
            onClick={() => {
              if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
              }
            }}
            label="Next Question"
          />
        </div>
      </div>
      <div className="w-full col-span-1">
        <SimulationExamSidebar
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          selectedAnswers={selectedAnswers}
          flaggedQuestions={flaggedQuestions}
        />
      </div>
    </div>
  );
};

export default SimulationExamPage;
