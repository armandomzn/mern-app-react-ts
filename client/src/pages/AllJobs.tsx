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
      toast.error(error?.response?.data?.message);
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
