import axios from "axios";

const setUserStatus = async (userId: number, status: boolean) => {
  try {
    const response = await axios.post(
      `https://certificateinformationportal.azurewebsites.net/api/v1/users/${userId}/setstatus`,
      {
        status: status,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error;
  }
};

export default setUserStatus;
