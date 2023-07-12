import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <h1 className="logo">mern app</h1>
      </nav>
      <div className="container-page">
        <div className="page-info">
          <h2>job <span>tracking</span> app</h2>
          <p>
          Fullstack application using the mern stack to register the jobs to which one has applied, where you can check the status, active, pending or rejected with various features such as filter jobs to which it has been applied, creation, update and deletion of the job postulated, test user, etc.
          </p>
          <button className="btn btn-hero">login/register</button>
        </div>
        <img src={main} alt="main image" className="main-image"/>
      </div>
    </Wrapper>
  );
};
export default Landing;
