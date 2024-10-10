import { Button } from "antd";
import MenuAdmin from "../../components/Layout/MenuAdmin";
import useCertificate from "../../hooks/useCertificate";

const Certificate = () => {
  const { certificate, loading, refetchCertificates } = useCertificate();
  return (
    <>
      <div className="h-[10vh] ">
        <div className="flex  items-center mb-4">
          <Button
            type="primary"
            // onClick={showModal}
          >
            + Course
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
          ) : certificate.length > 0 ? (
            certificate.map((m) => <div key={m.certId}>{m.certName}</div>)
          ) : (
            <div>No organizations available.</div>
          )}
        </div>
      </div>{" "}
    </>
  );
};
export default Certificate;
