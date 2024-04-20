import { JobProps } from "./JobProps";
import { PaginationProps } from "./PaginationProps";
import { SearchParamsType } from "./SearchParamsType";

export interface AllJobsContextProps {
  jobs: PaginationProps<JobProps[]>;
  searchValues: SearchParamsType;
}
