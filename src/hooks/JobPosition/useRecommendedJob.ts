import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { currentJob } from "../../models/jobPosition";
import { getRecommedByUser } from "../../redux/slice/JobPosition/recommendedJobSlice";


const useRecommendedJobs = (userId: string) => {
    const dispatch = useAppDispatch();
    const [recommendedJobs, setRecommendedJobs] = useState<currentJob[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch recommended jobs
    const fetchRecommendedJobs = async () => {
        setLoading(true);
        setError(null); // Reset error before making the request
        try {
            const response = await dispatch(getRecommedByUser(userId));

            // Check if the response is an array of currentJob
            if (Array.isArray(response.payload)) {
                setRecommendedJobs(response.payload); // Set the fetched recommended jobs
            } else {
                // Handle error from rejected state (JobError)
                setError(response.payload?.message || "An error occurred");
            }
        } catch (err) {
            console.log("Error fetching recommended jobs.", err);
            setError("Failed to fetch recommended jobs."); // Set error state
        } finally {
            setLoading(false);
        }
    };

    // Fetch recommended jobs when the component mounts or userId changes
    useEffect(() => {
        if (userId) {
            fetchRecommendedJobs();
        }
    }, [userId]); // Trigger when `userId` changes

    return { recommendedJobs, loading, error, refetchRecommendedJobs: fetchRecommendedJobs };
};

export default useRecommendedJobs;
