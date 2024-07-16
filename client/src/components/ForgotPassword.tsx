import { ActionFunction, Form, Link, redirect } from "react-router-dom";
import { Wrapper } from "../assets/wrappers/ResetForgotPassword";
import useEmailOrUsernameState from "../hooks/useEmailOrUsernameState";
import FormRow from "./FormRow";
import LandingNavBar from "./LandingNavBar";
import SubmitBtn from "./SubmitBtn";
import useDetectDarkMode from "../hooks/useDetectDarkMode";
import { agent } from "../api/agent";
import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";

export const forgotPasswordAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const forgotPasswordData = Object.fromEntries(formData);
    const { data }: AxiosResponse = await agent.Auth.forgotPassword(
      forgotPasswordData
    );
    toast.success(data?.message, { autoClose: 10000 });
    return redirect("/login");
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error?.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        for (const error of errorMessage) {
          toast.error(error, { autoClose: 5000 });
        }
      } else {
        toast.error(errorMessage, { autoClose: 5000 });
      }
    }
    return error;
  }
};

const ForgotPassword = () => {
  const { isDarkMode } = useDetectDarkMode();
  const { emailOrUserName, handleEmailOrUsername } = useEmailOrUsernameState();
  return (
    <Wrapper $isDarkTheme={isDarkMode}>
      <LandingNavBar className="landing-navbar" />
      <section className="section-center">
        <Form className="form" method="POST">
          <h3>forgot password</h3>
          <FormRow
            name={emailOrUserName}
            textLabel="email or username"
            type={emailOrUserName === "email" ? "email" : "text"}
            handlerFunction={(e) => handleEmailOrUsername(e.target.value)}
          />
          <SubmitBtn nameState="forgot-password-state" />
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Log In
            </Link>
          </p>
        </Form>
      </section>
    </Wrapper>
  );
};
export default ForgotPassword;
