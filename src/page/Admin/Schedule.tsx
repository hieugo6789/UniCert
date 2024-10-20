// import { Button } from "antd";
import { Calendar } from "antd";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
// import useSchedule from "../../hooks/useSchedule";

const Schedule = () => {
  // const { schedule, loading } = useSchedule();
  // const { schedule, loading, refetchSchedule } = useSchedule();
  return (
    <>
      <div className="h-[10vh] flex justify-between items-center">
        <div></div>
        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>
      <div className=" p-2 bg-slate-100 min-h-[90vh]">
        <Calendar />
        {/* <div className="col-span-10 bg-white p-4 rounded-lg shadow-lg">
          {loading ? (
            <div>Loading...</div>
          ) : schedule.length > 0 ? (
            schedule.map((m) => <div key={m.sessionId}>{m.sessionName}</div>)
          ) : (
            <div>No schedules available.</div>
          )}
        </div> */}
      </div>
    </>
  );
};
export default Schedule;
