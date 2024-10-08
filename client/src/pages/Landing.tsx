import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import LandingNavBar from "../components/LandingNavBar";
const Landing = () => {
  return (
    <Wrapper>
      <LandingNavBar />
      <div className="container-page">
        <div className="page-info">
          <h2>
            job <span>tracking</span> app
          </h2>
          <p>
            Fullstack application using the mern stack (Mongo, Express, React,
            NodeJs) to register the jobs to which one has applied, where you can
            check the status, active, pending or rejected with various features
            such as filter jobs to which it has been applied, creation, update
            and deletion of the job postulated, test user, etc.
          </p>
          <div className="landing-buttons">
            <Link className="btn btn-hero" to="/register">
              register
            </Link>
            <Link className="btn btn-hero" to="/login">
              login / demo user
            </Link>
          </div>
        </div>
        <img src={main} alt="main image" className="main-image" />
      </div>
    </Wrapper>
  );
};
export default Landing;
