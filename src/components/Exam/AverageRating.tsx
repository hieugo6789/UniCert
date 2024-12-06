import React, { useEffect, useState } from "react";
import axios from "axios";
import { Rate } from "antd";

interface AverageRatingProps {
  examId: number;
}

const AverageRating: React.FC<AverageRatingProps> = ({ examId }) => {
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [ratingCount, setRatingCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(
          `https://certificateinformationportal.azurewebsites.net/api/v1/feedback/average/${examId}`
        );
        setAverageRating(response.data.data.averageRating);
        setRatingCount(response.data.data.feedbackCount);
      } catch (err) {
        setError("No rating");
        console.error(err);
      }
    };

    fetchAverageRating();
  }, [examId]);

  if (error) return <div>{error}</div>;
  if (averageRating === null) return <div>Loading...</div>;

  return (
    <>
      <div className="flex items-center space-x-2">
        <Rate
          value={averageRating}
          allowHalf
          disabled
        />
        <div className="text-gray-500 text-base">/ {ratingCount}</div>
      </div>
    </>
  );
};

export default AverageRating;
