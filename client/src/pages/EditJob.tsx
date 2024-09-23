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
import { FormRow, SubmitBtn } from "../components";
import FormRowSelect from "../components/FormRowSelect";
import { JOB_STATUS, JOB_TYPE } from "../../../backend/src/helpers/constants";
import { ServerJobResponse } from "../interfaces";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { showToast } from "../utils/showToast";

const singleJobQuery = (id: string) => {
  return {
    queryKey: ["job", id],
    queryFn: async () => {
      const {
        data: { job },
      }: AxiosResponse<ServerJobResponse> = await agent.Jobs.getJob(
        id as string
      );
      return job;
    },
  };
};

export const editJobLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ params }) => {
    try {
      const { id } = params;
      await queryClient.ensureQueryData(singleJobQuery(id as string));
      return id;
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage: string | string[] = error?.response?.data?.message;
        showToast("edit-job-loader-error", errorMessage, "error");
      }
      return redirect("/dashboard/all-jobs");
    }
  };
export const editJobAction =
  (queryClient: QueryClient): ActionFunction =>
  async ({ request, params }) => {
    try {
      const { id } = params;
      const formData = await request.formData();
      const editForm = Object.fromEntries(formData);
      const { data }: AxiosResponse = await agent.Jobs.updateJob(
        id as string,
        editForm
      );
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      await queryClient.invalidateQueries({
        queryKey: ["job", id],
      });
      showToast("edit-job", data?.message);
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage: string | string[] = error?.response?.data?.message;
        showToast("edit-job-error", errorMessage, "error");
      }
      return error;
    }
  };

const EditJob = () => {
  const id = useLoaderData() as string;
  const {
    data = {
      position: "",
      jobLocation: "",
      jobType: "",
      company: "",
      jobStatus: "",
    },
  } = useQuery(singleJobQuery(id));
  const { position, jobLocation, jobType, company, jobStatus } = data;
  const { isDarkTheme } = useDashBoardContext();
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
        <SubmitBtn
          nameState={`update-job-submit`}
          optionalClassName="form-btn"
          optionalButtonText="edit"
        />
      </Wrapper>
    </Form>
  );
};
export default EditJob;
