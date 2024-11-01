import AvatarAdmin from "../../components/Header/AvatarAdmin";
import { DatePicker } from "@nextui-org/date-picker";
import { CalendarDate } from "@nextui-org/calendar";
import useSchedule from "../../hooks/Schedule/useScheduleByDay";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useEffect, useState } from "react";

const Schedule = () => {
  const { schedule, loading, refetchSchedule } = useSchedule();
  const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));
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
              <div className="schedule-columns flex space-x-4 ">
                {schedule.length ? (
                  schedule.map((item) => (
                    <div
                      key={item.sessionId}
                      className="p-4 mb-4 mt-4 schedule-column min-w-[250px] bg-white rounded shadow"
                    >
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
                      <p>
                        <strong>Created At:</strong>{" "}
                        {item.sessionCreatedAt.toLocaleDateString()}
                      </p>
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
