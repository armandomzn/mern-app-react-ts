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
import { toast } from "react-toastify";

export const profileUpdatePasswordAction: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const profileUpdatePasswordForm = Object.fromEntries(formData);
  try {
    const { data }: AxiosResponse = await agent.User.updateUserPassword(
      profileUpdatePasswordForm
    );
    toast.success(data?.message, { autoClose: 5000 });
    return redirect("/dashboard/profile");
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
