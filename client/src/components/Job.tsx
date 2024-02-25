import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);
import JobInfo from "./JobInfo";
import { JobProps } from "../interfaces/JobProps";
import { FaLocationArrow } from "react-icons/fa6";
import { FaCalendar, FaSuitcase } from "react-icons/fa";
import { Form, Link } from "react-router-dom";
import { SubmitBtn } from ".";

interface Props {
  job: JobProps;
}

const Job = ({
  job: { _id, company, position, jobStatus, jobType, jobLocation, createdAt },
}: Props) => {
  const date = dayjs(createdAt).format("MMM Do, YYYY");
  return (
    <article className="job">
      <header>
        <div className="job-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content-center">
        <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
        <JobInfo icon={<FaCalendar />} text={date} />
        <JobInfo icon={<FaSuitcase />} text={jobType} />
        <div className={`status ${jobStatus}`}>{jobStatus}</div>
      </div>
      <footer className="actions">
        {/* This will go to dashboard/edit-job */}
        <Link to={`../edit-job/${_id}`} className="btn edit-btn">
          edit
        </Link>
        <Form method="DELETE" action={`../delete-job/${_id}`}>
          <SubmitBtn
            nameState={`rem${_id}`}
            optionalMiniSpinnerColor="#450a0a"
            optionalClassName="delete-btn"
            optionalButtonText="delete"
          />
        </Form>
      </footer>
    </article>
  );
};
export default Job;
