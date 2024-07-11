import { JobProps, PaginationProps, SearchParamsType } from ".";

export interface AllJobsContextProps {
  jobs: PaginationProps<JobProps[]>;
  searchValues: SearchParamsType;
}
