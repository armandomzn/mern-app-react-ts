import Job from "./Job";
import { Wrapper } from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import { useDashBoardContext } from "../pages/DashboardLayout";
import PageBtnContainer from "./PageBtnContainer";

const JobContainer = () => {
  let {
    jobs: { Data, Count, PageIndex, PageSize },
  } = useAllJobsContext();
  const numOfPages = Math.ceil(Count / PageSize);
  const { isDarkTheme } = useDashBoardContext();
  if (Data.length === 0) {
    return (
      <Wrapper $isDarkTheme={isDarkTheme}>
        <div className="not-found">
          <p>jobs not created or not matching your search</p>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper $isDarkTheme={isDarkTheme}>
      <header className="page-header">
        <h4>
          Showing{" "}
          <span>
            <strong>
              {(PageIndex - 1) * PageSize + 1} -
              {PageIndex * PageSize > Count ? Count : PageIndex * PageSize}
            </strong>{" "}
            of <strong>{Count} jobs</strong>
          </span>
        </h4>
      </header>
      <div className="jobs">
        {Data.map((job) => {
          return <Job key={job._id} job={job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer numOfPages={numOfPages} />}
    </Wrapper>
  );
};
export default JobContainer;
