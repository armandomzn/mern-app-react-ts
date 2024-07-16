import { AxiosResponse, isAxiosError } from "axios";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
} from "react-router-dom";
import { toast } from "react-toastify";
import useDetectDarkMode from "../hooks/useDetectDarkMode";
import { Wrapper } from "../assets/wrappers/ResetForgotPassword";
import { FormRow, SubmitBtn } from ".";
import LandingNavBar from "./LandingNavBar";
import { agent } from "../api/agent";

export const resetPasswordLoader: LoaderFunction = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { email, token } = params;
    if (!email || !token) {
      throw new Error(`Please provide all values`);
    }
    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message;
      if (Array.isArray(errorMessage)) {
        for (const error of errorMessage) {
          toast.error(error, { autoClose: 5000 });
        }
      } else {
        toast.error(errorMessage, { autoClose: 5000 });
      }
    } else if (error instanceof Error) {
      toast.error(error.message, { autoClose: 5000 });
    }
    return redirect("/login");
  }
};

export const resetPasswordAction: ActionFunction = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const formData = await request.formData();
  const resetPasswordData = Object.fromEntries(formData);
  try {
    const { data }: AxiosResponse = await agent.Auth.resetPassword({
      ...params,
      ...resetPasswordData,
    });
    toast.success(data?.message, { autoClose: 5000 });
    return redirect("/login");
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message;
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

const ResetPassword = () => {
  const { isDarkMode } = useDetectDarkMode();
  return (
    <Wrapper $isDarkTheme={isDarkMode}>
      <LandingNavBar className="landing-navbar" />
      <section className="section-center">
        <Form className="form" method="POST">
          <h3>reset password</h3>
          <FormRow
            name="newPassword"
            type="password"
            textLabel="new password"
          />
          <FormRow
            name="newPasswordConfirm"
            type="password"
            textLabel="new password confirm"
          />
          <SubmitBtn
            nameState="reset-password-state"
            optionalClassName="reset-btn"
          />
        </Form>
      </section>
    </Wrapper>
  );
};
export default ResetPassword;
