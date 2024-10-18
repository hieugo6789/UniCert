// import { Button } from "antd";
import useSchedule from "../../hooks/useSchedule";

const Schedule = () => {
  const { schedule, loading } = useSchedule();
  // const { schedule, loading, refetchSchedule } = useSchedule();
  return (
    <>
      <div className="h-[10vh] flex items-center">
        {/* <div>
          <Button
            type="primary"
            // onClick={showModal}
          >
            + Schedule
          </Button>
        </div> */}
      </div>
      <div className=" gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className="col-span-10 bg-white p-4 rounded-lg shadow-lg">
          {loading ? (
            <div>Loading...</div>
          ) : schedule.length > 0 ? (
            schedule.map((m) => <div key={m.sessionId}>{m.sessionName}</div>)
          ) : (
            <div>No schedules available.</div>
          )}
        </div>
      </div>
    </>
  );
};
export default Schedule;
