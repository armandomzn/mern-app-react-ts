import { AxiosResponse, isAxiosError } from "axios";
import { ActionFunction, redirect } from "react-router-dom";
import { agent } from "../api/agent";
import { toast } from "react-toastify";

export const deleteJobAction: ActionFunction = async ({ params }) => {
  try {
    const { id } = params;
    const { data }: AxiosResponse = await agent.Jobs.deleteJob(id as string);
    toast.success(data?.message);
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data.message
            .map((message: string) => message)
            .join(",")
        : error?.response?.data.message;
      toast.error(errorMessage, { autoClose: 5000 });
    }
  }
  return redirect("/dashboard/all-jobs");
};
