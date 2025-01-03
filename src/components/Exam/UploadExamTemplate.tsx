import { message } from "antd";
import axios from "axios";
import { useRef, useState } from "react";

interface CreateExamQuestionProps {
  examId: number;
  refetchExams: () => void;
}

const UploadExamTemplate: React.FC<CreateExamQuestionProps> = ({
  examId,
  refetchExams,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      message.warning("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `https://certificateinformationportal.azurewebsites.net/api/v1/template-quiz-exam/upload-exam-template/${examId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      refetchExams();
      message.success(response.data.message);

      // Reset file input và state
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      message.error("File upload failed. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 ml-10">
        <div className="bg-white px-6 py-2 rounded-lg shadow-lg">
          <div className="flex space-x-4">
            <input
              type="file"
              ref={fileInputRef} // Gắn ref vào input
              onChange={handleFileChange}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              onClick={handleUpload}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadExamTemplate;
