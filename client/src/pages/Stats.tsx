import { LoaderFunction, useLoaderData } from "react-router-dom";
import { agent } from "../api/agent";
import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { StatsProps } from "../interfaces/StatsProps";
import { ChartsContainer, StatsContainer } from "../components";

export const statsLoader: LoaderFunction = async () => {
  try {
    const { data }: AxiosResponse = await agent.Jobs.getJobStats();
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

const Stats = () => {
  const { monthlyJobs, defaultStats } = useLoaderData() as StatsProps;
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyJobs.length > 1 && <ChartsContainer monthlyJobs={monthlyJobs} />}
    </>
  );
};
export default Stats;
