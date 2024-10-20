import AvatarAdmin from "../../components/Header/AvatarAdmin";

const SimulationExam = () => {
  return (
    <>
      <div className="h-[10vh] flex justify-between items-center  text-black p-4">
        <div className="text-2xl font-semibold">Exam Management</div>
        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>
      <div className=" p-2 bg-slate-100 min-h-[90vh]"></div>
    </>
  );
};
export default SimulationExam;
