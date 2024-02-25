import { ActionFunction, Form, redirect } from "react-router-dom";
import { Wrapper } from "../assets/wrappers/DashboardFormPage";
import { FormRow, SubmitBtn } from "../components";
import { useDashBoardContext, useUser } from "./DashboardLayout";
import FormRowSelect from "../components/FormRowSelect";
import { JOB_STATUS, JOB_TYPE } from "../../../backend/src/helpers/constants";
import { AxiosResponse, isAxiosError } from "axios";
import { agent } from "../api/agent";
import { toast } from "react-toastify";

export const addJobAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const addJobForm = Object.fromEntries(formData);
  try {
    const { data }: AxiosResponse = await agent.Jobs.createJob(addJobForm);
    toast.success(data.message);
    return redirect("/dashboard/all-jobs");
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
const AddJob = () => {
  const { user } = useUser();
  const { isDarkTheme } = useDashBoardContext();

  return (
    <Wrapper $isDarkTheme={isDarkTheme}>
      <h3>add job</h3>
      <Form method="POST" className="form">
        <FormRow name="position" type="text" />
        <FormRow name="company" type="text" />
        <FormRow
          name="jobLocation"
          textLabel="job location"
          type="text"
          defaultValue={user.location}
        />
        <FormRowSelect
          name="jobStatus"
          valueList={Object.values(JOB_STATUS)}
          defaultValue={JOB_STATUS.PENDING}
          labelText="job status"
        />
        <FormRowSelect
          name="jobType"
          valueList={Object.values(JOB_TYPE)}
          defaultValue={JOB_TYPE.FULL_TIME}
          labelText="job type"
        />
        <SubmitBtn nameState="add-job-submit" optionalClassName="form-btn" />
      </Form>
    </Wrapper>
  );
};
export default AddJob;
