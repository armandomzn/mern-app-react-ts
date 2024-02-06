import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { agent } from "../api/agent";
import { Wrapper } from "../assets/wrappers/DashboardFormPage";
import { useDashBoardContext } from "./DashboardLayout";
import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { ServerJobResponse } from "../interfaces/ServerJobResponse";
import { FormRow, MiniSpinner } from "../components";
import { JobProps } from "../interfaces/JobProps";
import FormRowSelect from "../components/FormRowSelect";
import { JOB_STATUS, JOB_TYPE } from "../../../backend/src/helpers/constants";
import useNavigationState from "../hooks/useNavigationState";

export const editJobLoader: LoaderFunction = async ({ params }) => {
  try {
    const { id } = params;
    const {
      data: { job },
    }: AxiosResponse<ServerJobResponse> = await agent.Jobs.getJob(id as string);
    return job;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data.message[0]
        : error?.response?.data.message;
      toast.error(errorMessage, { autoClose: 5000 });
    }
    return redirect("/dashboard/all-jobs");
  }
};
export const editJobAction: ActionFunction = async ({ request, params }) => {
  try {
    const { id } = params;
    const formData = await request.formData();
    const editForm = Object.fromEntries(formData);
    const { data }: AxiosResponse = await agent.Jobs.updateJob(
      id as string,
      editForm
    );
    toast.success(data?.message);
    return redirect("/dashboard/all-jobs");
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

const EditJob = () => {
  const { position, jobLocation, jobType, company, jobStatus } =
    useLoaderData() as JobProps;
  const { isDarkTheme } = useDashBoardContext();
  const { isSubmitting } = useNavigationState();
  return (
    <Form method="PATCH">
      <Wrapper $isDarkTheme={isDarkTheme}>
        <h3>edit job</h3>
        <FormRow name="position" type="text" defaultValue={position} />
        <FormRow name="company" type="text" defaultValue={company} />
        <FormRow
          name="jobLocation"
          type="text"
          defaultValue={jobLocation}
          textLabel="job location"
        />
        <FormRowSelect
          name="jobStatus"
          valueList={Object.values(JOB_STATUS)}
          defaultValue={jobStatus}
          labelText="job status"
        />
        <FormRowSelect
          name="jobType"
          valueList={Object.values(JOB_TYPE)}
          defaultValue={jobType}
          labelText="job type"
        />
        <button className="btn form-btn" disabled={isSubmitting}>
          {isSubmitting ? <MiniSpinner /> : "submit"}
        </button>
      </Wrapper>
    </Form>
  );
};
export default EditJob;
