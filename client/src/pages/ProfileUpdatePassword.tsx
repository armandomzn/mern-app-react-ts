import {
  ActionFunction,
  Form,
  redirect,
  useOutletContext,
} from "react-router-dom";
import { Wrapper } from "../assets/wrappers/DashboardFormPage";
import { ContextType } from "./DashboardLayout";
import { FormRow, SubmitBtn } from "../components";
import { AxiosResponse, isAxiosError } from "axios";
import { agent } from "../api/agent";
import { showToast } from "../utils/showToast";

export const profileUpdatePasswordAction: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const profileUpdatePasswordForm = Object.fromEntries(formData);
  try {
    const { data }: AxiosResponse = await agent.User.updateUserPassword(
      profileUpdatePasswordForm
    );
    showToast("profile-update-password", data?.message);
    return redirect("/dashboard/profile");
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage: string | string[] = error?.response?.data?.message;
      showToast("profile-update-password-error", errorMessage, "error");
    }
    return error;
  }
};

const ProfileUpdatePassword = () => {
  const { isDarkTheme } = useOutletContext() as ContextType;

  return (
    <Wrapper $isDarkTheme={isDarkTheme}>
      <h3>change password</h3>
      <Form method="PATCH">
        <FormRow
          type="password"
          name="oldPassword"
          textLabel="current password"
        />
        <FormRow type="password" name="newPassword" textLabel="new password" />
        <FormRow
          type="password"
          name="newPasswordConfirm"
          textLabel="new password confirm"
        />
        <SubmitBtn
          nameState="update-user-profile-password"
          optionalButtonText="change password"
          optionalClassName="form-btn"
        />
      </Form>
    </Wrapper>
  );
};
export default ProfileUpdatePassword;
