import { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MyInputEmail, MyInputPassword } from "../../components/UI/LoginInput";
import agent from "../../utils/agent";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required")
  });

  const resetValidationSchema = Yup.object().shape({
    code: Yup.string()
      .matches(/^\d{6}$/, "Code must be exactly 6 digits")
      .required("Code is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required("Confirm password is required")
  });

  const handleSendEmail = async (values: { email: string }) => {
    setIsLoading(true);
    try {
      await agent.resetPassword.forgotPassword(values);
      setEmail(values.email);
      setStep(2);
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    try {
      await agent.resetPassword.forgotPassword({ email });
    } catch (error) {
      console.error("Error resending code:", error);
    } finally {
      setResendLoading(false);
    }
  };

  const handleResetPassword = async (values: { code: string, newPassword: string }) => {
    setIsLoading(true);
    try {
      await agent.resetPassword.resetPassword({
        email: email,
        resetCode: values.code,
        newPassword: values.newPassword
      });
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {step === 1 ? "Reset Password" : "Enter Code"}
        </h2>

        {step === 1 ? (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={emailValidationSchema}
            onSubmit={handleSendEmail}
          >
            {({ isValid }) => (
              <Form className="space-y-4">
                <Field
                  name="email"
                  component={MyInputEmail}
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  disabled={!isValid || isLoading}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isLoading ? <Spin /> : "Send Reset Code"}
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{ code: "", newPassword: "", confirmPassword: "" }}
            validationSchema={resetValidationSchema}
            onSubmit={handleResetPassword}
          >
            {({ values }) => (
              <Form className="space-y-4">
                <div>
                  <Field
                    name="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="w-full p-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resendLoading}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {resendLoading ? <Spin /> : "Resend code"}
                  </button>
                </div>
                <Field
                  name="newPassword"
                  component={MyInputPassword}
                  placeholder="New password"
                />
                <Field
                  name="confirmPassword"
                  component={MyInputPassword}
                  placeholder="Confirm password"
                />
                <button
                  type="submit"
                  disabled={!(values.code && values.newPassword && values.confirmPassword) || isLoading}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isLoading ? <Spin /> : "Reset Password"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
