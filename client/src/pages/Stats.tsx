import { LoaderFunction } from "react-router-dom";
import { agent } from "../api/agent";
import { AxiosResponse } from "axios";
import { StatsProps } from "../interfaces";
import { ChartsContainer, StatsContainer } from "../components";
import { QueryClient, useQuery } from "@tanstack/react-query";

//* Custom stats object for query data
const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const { data }: AxiosResponse<StatsProps> = await agent.Jobs.getJobStats();
    return data;
  },
};

//* With react query we don't use in this loader the returned data, but instead, before it loads the component we check if the data is in cache, if so, then we retrieve it, otherwise, we make the request using the ensureQueryData method, with this we ensure that useQuery hook has access to the data when component mount.

export const statsLoader =
  (query: QueryClient): LoaderFunction =>
  async () => {
    const data = await query.ensureQueryData(statsQuery);
    return data;
  };

const Stats = () => {
  const { data } = useQuery({ ...statsQuery });
  return (
    <>
      <StatsContainer
        defaultStats={
          data?.defaultStats || {
            pending: 0,
            interview: 0,
            declined: 0,
          }
        }
      />
      {(data?.monthlyJobs.length || 0) > 1 && (
        <ChartsContainer
          monthlyJobs={data?.monthlyJobs || [{ date: "", count: 0 }]}
        />
      )}
    </>
  );
};
export default Stats;
