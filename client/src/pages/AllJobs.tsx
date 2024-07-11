import { LoaderFunction, useLoaderData } from "react-router-dom";
import { agent } from "../api/agent";
import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { JobContainer, SearchContainer } from "../components";
import { createContext, useContext } from "react";
import {
  AllJobsContextProps,
  JobProps,
  PaginationProps,
  SearchParamsType,
} from "../interfaces";

export const allJobsLoader: LoaderFunction = async ({ request }) => {
  try {
    // We extract from request.url the query params through the URL api
    // From array we create an object with fromEntries method
    // [
    //   ["search", ""],
    //   ["jobStatus", "pending"],
    //   ["jobType", "full-time"],
    //   ["sort", "oldest"],
    // ];
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log("params -> ", params);
    const { data }: AxiosResponse<PaginationProps<JobProps[]>> =
      await agent.Jobs.getAllJobs(params);
    // We send params to the container if they exist and to keep persistance in inputs from SearchContainer component when user reloads the page
    return {
      jobs: data,
      searchValues: { ...params },
    };
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
  const { jobs, searchValues } = useLoaderData() as {
    jobs: PaginationProps<JobProps[]>;
    searchValues: SearchParamsType;
  };
  console.log(jobs, searchValues);
  return (
    <AllJobsContext.Provider value={{ jobs, searchValues }}>
      <SearchContainer />
      <JobContainer />
    </AllJobsContext.Provider>
  );
};
export default AllJobs;
