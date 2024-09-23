import { AxiosResponse, isAxiosError } from "axios";
import { ActionFunction, redirect } from "react-router-dom";
import { agent } from "../api/agent";
import { QueryClient } from "@tanstack/react-query";
import { showToast } from "../utils/showToast";

export const deleteJobAction =
  (queryClient: QueryClient): ActionFunction =>
  async ({ params }) => {
    try {
      const { id } = params;
      const { data }: AxiosResponse = await agent.Jobs.deleteJob(id as string);
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      await queryClient.invalidateQueries({ queryKey: ["job", id] });
      showToast("delete-job", data?.message);
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage: string | string[] = error?.response?.data?.message;
        showToast("delete-job-error", errorMessage, "error");
      }
    }
    return redirect("/dashboard/all-jobs");
  };
