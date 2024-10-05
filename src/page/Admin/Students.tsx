import { ROLE } from "../../constants/role";
import { useAccounts } from "../../hooks/useAccount";

const Students = () => {
  const { accounts: studentAccounts, loading, error } = useAccounts(ROLE.role4);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : studentAccounts.length > 0 ? (
        studentAccounts.map((acc) => (
          <div key={acc.userId}>
            {acc.userId} - {acc.username}
          </div> // Render majorCode
        ))
      ) : (
        <div>No majors available.</div> // Message if no majors are found
      )}
    </div>
  );
};
export default Students;
