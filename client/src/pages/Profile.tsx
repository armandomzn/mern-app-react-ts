import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useOutletContext,
  useSubmit,
} from "react-router-dom";
import { Wrapper } from "../assets/wrappers/DashboardFormPage";
import { ContextType } from "./DashboardLayout";
import { FormRow, SubmitBtn } from "../components";
import { AxiosResponse, isAxiosError } from "axios";
import { agent } from "../api/agent";
import { QueryClient } from "@tanstack/react-query";
import { showToast } from "../utils/showToast";
import { useRef } from "react";

export const profileAction =
  (queryClient: QueryClient): ActionFunction =>
  async ({ request }) => {
    try {
      const formData = await request.formData();
      const { data }: AxiosResponse = await agent.User.updateUser(formData);
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      showToast("profile", data?.message);
      return redirect("/dashboard/profile");
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage: string | string[] = error?.response?.data?.message;
        showToast("profile-error", errorMessage, "error");
      }
      return error;
    }
  };

export const deleteProfileAction =
  (queryClient: QueryClient): ActionFunction =>
  async () => {
    try {
      const { data }: AxiosResponse = await agent.User.deleteProfileImage();
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      showToast("profile-image", data?.message);
      return redirect("/dashboard/profile");
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage: string | string[] = error?.response?.data?.message;
        showToast("profile-image-error", errorMessage, "error");
      }
      return error;
    }
  };

const Profile = () => {
  const { user, isDarkTheme } = useOutletContext() as ContextType;
  const submit = useSubmit();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(e.currentTarget, { method: "PATCH" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Wrapper $isDarkTheme={isDarkTheme}>
      <h3>profile</h3>
      {user.avatar && (
        <Form method="DELETE" action="../delete-profile-image">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              current profile image
            </label>
            <div className="flex-container">
              <div className="avatar-container">
                <a href={user.avatar} target="_blank">
                  <img src={user.avatar} alt="avatar-image" />
                </a>
              </div>
              <SubmitBtn
                nameState={`remove-image-profile-submit`}
                optionalButtonText="delete image"
                optionalClassName="btn-full"
                currentFormAction="/dashboard/delete-profile-image"
              />
            </div>
          </div>
        </Form>
      )}
      <Form
        method="PATCH"
        encType="multipart/form-data"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="form-row">
          <label htmlFor="avatar" className="form-label">
            {user.avatar ? "replace" : "select"} an image file (max 0.5MB |
            optional)
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            ref={fileInputRef}
          />
        </div>
        <FormRow name="name" defaultValue={user.name} type="text" />
        <FormRow
          name="lastName"
          defaultValue={user.lastName}
          type="text"
          textLabel="last name"
        />
        <FormRow name="email" defaultValue={user.email} type="email" />
        <FormRow name="location" defaultValue={user.location} type="location" />
        <Link
          to="update-password"
          className="btn change-password"
          style={{ margin: "2rem 0 0 0" }}
        >
          change password
        </Link>
        <SubmitBtn
          nameState={`update-profile-submit`}
          optionalButtonText="update profile"
          optionalClassName="form-btn"
          currentFormAction="/dashboard/profile"
        />
      </Form>
    </Wrapper>
  );
};
export default Profile;
