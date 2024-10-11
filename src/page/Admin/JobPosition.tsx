import { Button } from "antd";
import useJob from "../../hooks/useJobPosition";
import MenuAdmin from "../../components/Layout/MenuAdmin";

const JobPosition = () => {
  const { job, loading, refetchJobs } = useJob();

  return (
    <>
      <div className="h-[10vh] ">
        <div className="flex  items-center mb-4">
          <Button
            type="primary"
            // onClick={showModal}
          >
            + Job position
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className="col-span-2">
          <MenuAdmin />
        </div>{" "}
        <div className="col-span-10 bg-white p-4 rounded-lg shadow-lg">
          {loading ? (
            <div>Loading...</div>
          ) : job.length > 0 ? (
            job.map((m) => <div key={m.jobPositionId}>{m.jobPositionName}</div>)
          ) : (
            <div>No organizations available.</div>
          )}
        </div>
      </div>{" "}
    </>
  );
};
export default JobPosition;
