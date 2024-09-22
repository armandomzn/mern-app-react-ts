import { AxiosResponse, isAxiosError } from "axios";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
} from "react-router-dom";
import useDetectDarkMode from "../hooks/useDetectDarkMode";
import { Wrapper } from "../assets/wrappers/ResetForgotPassword";
import { FormRow, SubmitBtn } from ".";
import LandingNavBar from "./LandingNavBar";
import { agent } from "../api/agent";
import { showToast } from "../utils/showToast";

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
      const errorMessage: string | string[] = error.response?.data?.message;
      showToast("reset-password-loader-error", errorMessage, "error");
    } else if (error instanceof Error) {
      showToast("reset-password-loader-general-error", error.message, "error");
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
    showToast("reset-password", data?.success);
    return redirect("/login");
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message;
      showToast("reset-password-error", errorMessage, "error");
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
