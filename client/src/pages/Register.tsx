import { Wrapper } from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../components";
import { Link } from "react-router-dom";
import { useDashBoardContext } from "./DashboardLayout";

const Register = () => {
  const { isDarkTheme } = useDashBoardContext();
  return (
    <Wrapper isDarkTheme={isDarkTheme}>
      <form className="form">
        <h1 className="logo">mern app</h1>
        <h4>register</h4>
        <FormRow name="name" type="text" defaultValue="john" />
        <FormRow
          name="lastName"
          type="text"
          defaultValue="doe"
          textLabel="last name"
        />
        <FormRow name="location" type="text" defaultValue="earth" />
        <FormRow name="email" type="email" defaultValue="john@email.com" />
        <FormRow name="password" type="password" defaultValue="secret123" />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p className="member">
          already a member? <Link to="/login">Login</Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
