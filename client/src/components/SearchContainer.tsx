import { Form, Link, useSubmit } from "react-router-dom";
import { Wrapper } from "../assets/wrappers/DashboardFormPage";
import { useUser } from "../pages/DashboardLayout";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import {
  JOB_SORT,
  JOB_STATUS,
  JOB_TYPE,
} from "../../../backend/src/helpers/constants";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
  const { isDarkTheme } = useUser();
  const submit = useSubmit();
  const {
    searchValues: { search, sort, jobStatus, jobType },
  } = useAllJobsContext();

  // This function allow us to delay the execution of submit (callback function) when user write in input
  const debounce = (
    callback: (formElement: HTMLFormElement | null) => void
  ) => {
    // This will create the timeout variable
    let timeout: null | ReturnType<typeof setTimeout> = null;
    // Debounce function return another function that executes when event is trigger (onChange)
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const form = e.currentTarget.form;
      if (timeout) {
        clearTimeout(Number(timeout));
      }
      timeout = setTimeout(() => {
        callback(form);
      }, 2000);
    };
  };
    return (
    <Wrapper $isDarkTheme={isDarkTheme}>
      <h3>search form</h3>
      <Form className="search-form">
        <FormRow
          type="text"
          name="search"
          // handlerFunction={(e) => {
          //   submit(e.currentTarget.form);
          // }}
          handlerFunction={
            // debounce function receives a callback function, as argument receives form element
            debounce((form) => {
              submit(form);
            })
          }
          defaultValue={search}
        />
        <FormRowSelect
          defaultValue={jobStatus}
          labelText="job status"
          name="jobStatus"
          valueList={["all", ...Object.values(JOB_STATUS)]}
          handlerFunction={(e) => {
            // this will point to the current input (e.currentTarget) that's why we access to form property to point to the form
            submit(e.currentTarget.form);
          }}
        />
        <FormRowSelect
          defaultValue={jobType}
          labelText="job type"
          name="jobType"
          valueList={["all", ...Object.values(JOB_TYPE)]}
          handlerFunction={(e) => {
            // this will point to the current input (e.currentTarget) that's why we access to form property to point to the form
            submit(e.currentTarget.form);
          }}
        />
        <FormRowSelect
          defaultValue={sort}
          labelText="sort"
          name="sort"
          valueList={Object.values(JOB_SORT)}
          handlerFunction={(e) => {
            // this will point to the current input (e.currentTarget) that's why we access to form property to point to the form
            submit(e.currentTarget.form);
          }}
        />
        <Link to={`../all-jobs`} className="btn search-btn">
          reset search value
        </Link>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
