import Job from "./Job";
import { Wrapper } from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import { useDashBoardContext } from "../pages/DashboardLayout";

const JobContainer = () => {
  const { jobs } = useAllJobsContext();
  const { isDarkTheme } = useDashBoardContext();

  if (jobs.length === 0) {
    return (
      <Wrapper $isDarkTheme={isDarkTheme}>
        <div className="not-found">
          <p>jobs not created</p>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper $isDarkTheme={isDarkTheme}>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} job={job} />;
        })}
      </div>
    </Wrapper>
  );
};
export default JobContainer;
