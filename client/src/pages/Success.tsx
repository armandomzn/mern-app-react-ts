import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wrapper } from "../assets/wrappers/Success";
import LandingNavBar from "../components/LandingNavBar";
import SuccessImage from "../components/SuccessImage";
import { useEffect, useState } from "react";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!location.state || !location.state?._isRedirect) {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [location.state]);

  if (isLoading) {
    return (
      <div className="loading-parent">
        <div className="loading"></div>
      </div>
    );
  }

  return (
    <Wrapper>
      <LandingNavBar className="landing-navbar" />
      <section className="section-center">
        <header className="success-image">
          <SuccessImage />
        </header>
        <div className="success-info">
          <h1>mail sent successfully!</h1>
          <p>Thank you! The email was sent correctly.</p>
          <p>Please confirm your account through the email we send you.</p>
          <p>Best regards,</p>
        </div>
        <footer>
          <Link to="/" className="btn">
            go back
          </Link>
        </footer>
      </section>
    </Wrapper>
  );
};
export default Success;
