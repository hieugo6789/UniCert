import { Button } from "antd";
import MenuAdmin from "../../components/Layout/MenuAdmin";
import useSchedule from "../../hooks/useSchedule";

const Schedule = () => {
  const { schedule, loading, refetchSchedule } = useSchedule();
  return (
    <>
      <div className="h-[10vh] ">
        <div className="flex  items-center mb-4">
          <Button
            type="primary"
            // onClick={showModal}
          >
            + Schedule
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className="col-span-2">
          <MenuAdmin />
        </div>
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