import AvatarAdmin from "../../components/Header/AvatarAdmin";
import { DatePicker } from "@nextui-org/date-picker";
import { CalendarDate } from "@nextui-org/calendar";
import useSchedule from "../../hooks/Schedule/useScheduleByDay";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useEffect, useState } from "react";
import useDeleteSchedule from "../../hooks/Schedule/useDeleteSchedule";

const Schedule = () => {
  const { schedule, loading, refetchSchedule } = useSchedule();
  const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));
  const { handleDeleteSchedule } = useDeleteSchedule();
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  useEffect(() => {
    const fetchInitialSchedule = async () => {
      const formattedDate = selectedDate.toString();
      await refetchSchedule(formattedDate);
    };
    fetchInitialSchedule();
  }, []);

  const handleDateChange = async (newDate: CalendarDate) => {
    setSelectedDate(newDate);
    schedule.length = 0;
    const formattedDate = newDate.toString(); // Adjust format if necessary
    await refetchSchedule(formattedDate); // Fetch data for the selected date
  };
  const toggleDeleteOption = (sessionId: any) => {
    setSelectedSessionId((prev) => (prev === sessionId ? null : sessionId));
  };

  const handleDelete = (sessionId: number) => {
    handleDeleteSchedule(sessionId);
    const formattedDate = selectedDate.toString();
    refetchSchedule(formattedDate);
    setSelectedSessionId(null);
  };

  return (
    <>
      <div className="h-[10vh] flex justify-between items-center">
        <div></div>
        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>
      <div className="p-2 min-h-[90vh]">
        <div className="bg-white p-4 rounded-lg shadow-lg ">
          <DatePicker
            label="Select day"
            className="w-1/3"
            defaultValue={selectedDate}
            onChange={handleDateChange}
          />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="schedule-container overflow-x-auto min-h-[76vh]">
              <div className="schedule-columns flex space-x-4">
                {schedule.length ? (
                  schedule.map((item) => (
                    <div
                      key={item.sessionId}
                      className="relative p-4 mb-4 mt-4 schedule-column min-w-[250px] bg-white rounded shadow"
                    >
                      <div className="absolute top-2 right-2">
                        <div className="relative">
                          <button
                            onClick={() => toggleDeleteOption(item.sessionId)}
                            className="text-black hover:text-gray-700"
                          >
                            &#8942;
                          </button>
                          {selectedSessionId === item.sessionId && (
                            <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg p-2">
                              <button
                                onClick={() => handleDelete(item.sessionId)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <h3 className="font-bold">{item.sessionName}</h3>
                      <p>
                        <strong>Code:</strong> {item.sessionCode}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {item.sessionDate.toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Address:</strong> {item.sessionAddress}
                      </p>
                      <p>
                        <strong>Certificate ID:</strong> {item.certId}
                      </p>
                      <p>{item.sessionTime}</p>
                    </div>
                  ))
                ) : (
                  <p>No schedules available for this date.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Schedule;
