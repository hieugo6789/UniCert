import React from 'react';
import { FaFlag } from "react-icons/fa";

type EssayQuestionProps = {
  question: {
    id: number;
    questionText: string;
    questionType: string;
    essayAnswer?: string;
  };
  currentQuestionIndex: number;
  selectedAnswer: string;
  flagged: boolean;
  onFlag: () => void;
  onSelectAnswer: (answer: string) => void;
  onClearAnswer: () => void;
};

const EssayQuestion: React.FC<EssayQuestionProps> = ({
  question,
  currentQuestionIndex,
  selectedAnswer,
  flagged,
  onFlag,
  onSelectAnswer,
  onClearAnswer,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Question {currentQuestionIndex + 1}
        </h2>
        <button
          onClick={onFlag}
          className={`p-2 rounded-full transition-colors duration-200 ${
            flagged 
              ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-500" 
              : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          title={flagged ? "Remove flag" : "Flag question"}
        >
          <FaFlag size={20} />
        </button>
      </div>

      <div className="mb-8">
        <div
          className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: question.questionText || "",
          }}
        />
      </div>

      <div className="space-y-4">
        <textarea
          value={selectedAnswer}
          onChange={(e) => onSelectAnswer(e.target.value)}
          className="w-full h-48 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:outline-none"
          placeholder="Type your answer here..."
        />
        
        {selectedAnswer && (
          <button
            onClick={onClearAnswer}
            className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
          >
            Clear Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default EssayQuestion;
