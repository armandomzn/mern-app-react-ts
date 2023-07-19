import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";
import { Wrapper } from "../assets/wrappers/ErrorPage";

const Error = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <Wrapper>
          <div className="section-center">
            <h1>404</h1>
            <h4>Opps! Page not found</h4>
            <p>Sorry, the page you tried cannot be found</p>
            <Link to="/">back home</Link>
          </div>
        </Wrapper>
      );
    }
  }
  return <Wrapper>There was an error</Wrapper>;
};
export default Error;
