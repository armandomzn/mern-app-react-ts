import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useOutletContext,
} from "react-router-dom";
import { Wrapper } from "../assets/wrappers/DashboardFormPage";
import { ContextType } from "./DashboardLayout";
import { FormRow, SubmitBtn } from "../components";
import { toast } from "react-toastify";
import { AxiosResponse, isAxiosError } from "axios";
import { agent } from "../api/agent";

export const profileAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const { data }: AxiosResponse = await agent.User.updateUser(formData);
    toast.success(data?.message);
    return redirect("/dashboard/profile");
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data.message
            .map((message: string) => message)
            .join(",")
        : error?.response?.data.message;
      toast.error(errorMessage, { autoClose: 5000 });
    }
    return error;
  }
};

export const deleteProfileAction: ActionFunction = async () => {
  try {
    const { data }: AxiosResponse = await agent.User.deleteProfileImage();
    toast.success(data?.message);
    return redirect("/dashboard/profile");
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data.message[0]
        : error?.response?.data.message;
      toast.error(errorMessage, { autoClose: 5000 });
    }
    return error;
  }
};

const Profile = () => {
  const { user, isDarkTheme } = useOutletContext() as ContextType;
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
              />
            </div>
          </div>
        </Form>
      )}
      <Form method="PATCH" encType="multipart/form-data">
        <div className="form-row">
          <label htmlFor="avatar" className="form-label">
            {user.avatar ? "replace" : "select"} an image file (max 0.5MB |
            optional)
          </label>
          <input type="file" name="avatar" id="avatar" accept="image/*" />
        </div>
        <FormRow name="name" defaultValue={user.name} type="text" />
        <FormRow
          name="lastName"
          defaultValue={user.lastName}
          type="text"
          textLabel="last name"
        />
        {/* <FormRow name="email" defaultValue={user.email} type="email" /> */}
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
        />
      </Form>
    </Wrapper>
  );
};
export default Profile;
