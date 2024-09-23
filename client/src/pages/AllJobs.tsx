import { LoaderFunction, useLoaderData } from "react-router-dom";
import { agent } from "../api/agent";
import { AxiosResponse, isAxiosError } from "axios";
import { JobContainer, SearchContainer } from "../components";
import { createContext, useContext } from "react";
import {
  AllJobsContextProps,
  JobProps,
  PaginationProps,
  SearchParamsType,
} from "../interfaces";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { showToast } from "../utils/showToast";

const allJobsQuery = (params: SearchParamsType) => {
  const { search, sort, jobStatus, jobType, page } = params;
  return {
    queryKey: [
      "jobs",
      {
        search: search ?? "",
        sort: sort ?? "newest",
        jobStatus: jobStatus ?? "all",
        jobType: jobType ?? "all",
        page: page ?? "1",
      },
    ],
    queryFn: async () => {
      const { data }: AxiosResponse<PaginationProps<JobProps[]>> =
        await agent.Jobs.getAllJobs(params);
      return data;
    },
  };
};

export const allJobsLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ request }) => {
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
      // We send params to the container if they exist and to keep persistance in inputs from SearchContainer component when user reloads the page
      await queryClient.ensureQueryData(allJobsQuery(params));
      return {
        searchValues: { ...params },
      };
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage: string | string[] = error?.response?.data?.message;
        showToast("all-jobs-error", errorMessage, "error");
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
  const { searchValues } = useLoaderData() as {
    searchValues: SearchParamsType;
  };
  let { data } = useQuery(allJobsQuery(searchValues));
  const jobs = data || {
    PageIndex: 0,
    PageSize: 0,
    Count: 0,
    Data: [],
  };
  console.log("searchValues -> ", searchValues);
  return (
    <AllJobsContext.Provider value={{ jobs, searchValues }}>
      <SearchContainer />
      <JobContainer />
    </AllJobsContext.Provider>
  );
};
export default AllJobs;
