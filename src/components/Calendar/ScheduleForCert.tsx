import { useEffect, useState } from "react";
import { allSchedulePaginationData } from "../../models/schedule";
import { useParams } from "react-router-dom";

const ScheduleForCert = () => {
  const { id } = useParams<{ id: string }>();
  const certId = Number(id);
  const [sessions, setSessions] = useState<allSchedulePaginationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(
          `https://certificateinformationportal.azurewebsites.net/api/v1/exam-session/by-cert/${certId}`
        );
        const data = await response.json();
        if (data.succeeded) {
          setSessions(data.data);
        } else {
          setError("Failed to fetch sessions.");
        }
      } catch (err) {
        setError("An error occurred while fetching sessions.");
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(certId)) {
      fetchSessions();
    } else {
      setError("Invalid certification ID.");
      setLoading(false);
    }
  }, [certId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-blue-500">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-12">
        Exam Schedule for Certification
      </h1>
      {sessions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((session) => (
            <div
              key={session.sessionId}
              className="relative border border-gray-200 rounded-2xl shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-lg text-sm">
                {session.sessionCode}
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-3">
                  <span className="font-medium text-indigo-500">Date:</span>{" "}
                  {new Date(
                    new Date(session.sessionDate).setHours(
                      new Date(session.sessionDate).getHours() + 7
                    )
                  )
                    .toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .replace(",", "")}
                </p>
                <p className="text-gray-700 mb-3">
                  <span className="font-medium text-indigo-500">Time:</span>{" "}
                  {session.sessionTime}
                </p>
                <p className="text-gray-700 mb-3">
                  <span className="font-medium text-indigo-500">Address:</span>{" "}
                  {session.sessionAddress}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No sessions available.
        </p>
      )}
    </div>
  );
};

export default ScheduleForCert;
