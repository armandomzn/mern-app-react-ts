import { LoaderFunction, useLoaderData } from "react-router-dom";
import { agent } from "../api/agent";
import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { JobContainer, SearchContainer } from "../components";
import { JobsProps } from "../interfaces/JobsProps";
import { createContext, useContext } from "react";
import { AllJobsContextProps } from "../interfaces/AllJobsContextProps";

export const allJobsLoader: LoaderFunction = async () => {
  try {
    const { data }: AxiosResponse<JobsProps> = await agent.Jobs.getAllJobs();
    return data;
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

const AllJobsContext = createContext<undefined | AllJobsContextProps>(
  undefined
);

export const useAllJobsContext = () => {
  const context = useContext(AllJobsContext);
  if (context === undefined) {
    throw new Error("useAllJobsContext must be within AllJobs");
  }
  return context;
};

const AllJobs = () => {
  const { jobs } = useLoaderData() as JobsProps;
  return (
    <AllJobsContext.Provider value={{ jobs }}>
      <SearchContainer />
      <JobContainer />
    </AllJobsContext.Provider>
  );
};
export default AllJobs;
