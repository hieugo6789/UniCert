import React from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import axios from "axios";

const GoogleLoginComponent: React.FC = () => {
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      // Send the token to your backend for login
      try {
        const response = await axios.get(
          "https://certificateinformationportal.azurewebsites.net/Google/login-google",
          {
            params: {
              token: credentialResponse.credential, // Send the token as a query parameter
            },
          }
        );
        console.log("Backend response:", response.data);
        // Handle the response, maybe save user info or tokens in state/context
      } catch (error) {
        console.error("Error sending token to backend:", error);
      }
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId="534129186963-flafa7n8c3bpgto3smv3a74e3pn0v97c.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
