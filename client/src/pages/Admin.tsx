import { AxiosResponse, isAxiosError } from "axios";
import { LoaderFunction, redirect, useLoaderData } from "react-router-dom";
import { agent } from "../api/agent";
import { AppStatsProps } from "../interfaces";
import { Wrapper } from "../assets/wrappers/StatContainer";
import StatItem from "../components/StatItem";
import { FaSuitcase, FaUsers } from "react-icons/fa";
import { showToast } from "../utils/showToast";

export const loaderAdmin: LoaderFunction = async () => {
  try {
    const { data }: AxiosResponse = await agent.User.getAdminStats();
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error?.response?.data?.message;
      showToast("admin-loader-error", errorMessage, "error");
    }
    return redirect("/dashboard");
  }
};
const Admin = () => {
  const { jobs, users } = useLoaderData() as AppStatsProps;
  return (
    <Wrapper>
      <StatItem
        title="current jobs"
        count={jobs}
        icon={<FaSuitcase />}
        color="#99f6e4"
        backgroundColor="#14b8a6"
      />
      <StatItem
        title="current users"
        count={users}
        icon={<FaUsers />}
        color="#bbf7d0"
        backgroundColor="#22c55e"
      />
    </Wrapper>
  );
};
export default Admin;
