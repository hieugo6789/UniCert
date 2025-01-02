import { useState, useEffect } from "react";
import { allSchedulePaginationData } from "../../models/schedule";
import { useParams } from "react-router-dom";
import plusIcon from "../../assets/icons/plus.png";

const ScheduleForCert = () => {
  const { id } = useParams<{ id: string }>();
  const certId = Number(id);
  const [sessions, setSessions] = useState<allSchedulePaginationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newSessionData, setNewSessionData] = useState({
    sessionName: "",
    sessionCode: "",
    sessionDate: "",
    sessionAddress: "",
    sessionTime: "",
  });

  const [createError, setCreateError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false); // State to toggle form visibility

  const handleInputDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "sessionDate" && value) {
      // Convert the input date to UTC+7 (Vietnam timezone)
      const dateInUTC = new Date(value);
      const vietnamTime = new Date(dateInUTC.getTime() + 7 * 60 * 60 * 1000); // Add 7 hours to convert to Vietnam's timezone
      setNewSessionData((prevData) => ({
        ...prevData,
        [name]: vietnamTime.toISOString().slice(0, 16), // Formatting as 'YYYY-MM-DDTHH:mm'
      }));
    } else {
      setNewSessionData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await fetch(
        `https://certificateinformationportal.azurewebsites.net/api/v1/exam-session/by-cert/${certId}`
      );
      const data = await response.json();
      if (data.succeeded) {
        setSessions(data.data);
      } else {
        // setError("This exam has no schedule");
      }
    } catch (err) {
      setError("An error occurred while fetching sessions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isNaN(certId)) {
      fetchSessions();
    } else {
      setError("Invalid certification ID.");
      setLoading(false);
    }
  }, [certId]);

  const createSession = async () => {
    if (
      !newSessionData.sessionName ||
      !newSessionData.sessionCode ||
      !newSessionData.sessionDate ||
      !newSessionData.sessionAddress ||
      !newSessionData.sessionTime
    ) {
      setCreateError("Please fill in all the fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://certificateinformationportal.azurewebsites.net/api/v1/exam-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            certId,
            sessionName: newSessionData.sessionName,
            sessionCode: newSessionData.sessionCode,
            sessionDate: newSessionData.sessionDate,
            sessionAddress: newSessionData.sessionAddress,
            sessionTime: newSessionData.sessionTime,
          }),
        }
      );
      const data = await response.json();
      if (data.succeeded) {
        fetchSessions();
        setNewSessionData({
          sessionName: "",
          sessionCode: "",
          sessionDate: "",
          sessionAddress: "",
          sessionTime: "",
        });
        setCreateError("");
      } else {
        setCreateError("Failed to create session.");
      }
    } catch (err) {
      setCreateError("An error occurred while creating session.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSessionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
                      new Date(session.sessionDate).getHours() + 0
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

      {/* Create Session Form */}
      <div className="mt-12 relative">
        <div className="mt-8 opacity-0">x</div>
        <button
          onClick={() => setShowCreateForm((prev) => !prev)}
          className="absolute left-1/2 top-0 transform -translate-x-1/2"
        >
          <img
            src={plusIcon}
            className="size-10"
          />
        </button>
        {showCreateForm && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-12">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createSession();
              }}
              className="space-y-6"
            >
              <input
                type="text"
                name="sessionName"
                value={newSessionData.sessionName}
                onChange={handleInputChange}
                placeholder="Session Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <input
                type="text"
                name="sessionCode"
                value={newSessionData.sessionCode}
                onChange={handleInputChange}
                placeholder="Session Code"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <input
                type="datetime-local"
                name="sessionDate"
                value={newSessionData.sessionDate}
                onChange={handleInputDateChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <input
                type="text"
                name="sessionAddress"
                value={newSessionData.sessionAddress}
                onChange={handleInputChange}
                placeholder="Session Address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <input
                type="text"
                name="sessionTime"
                value={newSessionData.sessionTime}
                onChange={handleInputChange}
                placeholder="Session Time"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {createError && (
                <div className="text-red-500 ml-2">{createError}</div>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition-all"
              >
                Create Session
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleForCert;
