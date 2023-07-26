import { Wrapper } from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../components";
import { Link } from "react-router-dom";
interface Props {
  isDarkThemeEnabled: boolean;
}
const Login = ({ isDarkThemeEnabled: isDarkTheme }: Props) => {
  return (
    <Wrapper isDarkTheme={isDarkTheme}>
      <form className="form">
        <h1 className="logo">mern app</h1>
        <h4>login</h4>
        <FormRow name="email" type="email" defaultValue="john@email.com" />
        <FormRow name="password" type="password" defaultValue="secret123" />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <button type="submit" className="btn btn-block">
          explore the app
        </button>
        <p className="member">
          Not a member? <Link to="/register">register</Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Login;
