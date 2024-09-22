import {
  isRouteErrorResponse,
  useRouteError,
  Link,
} from "react-router-dom";
import { Wrapper } from "../assets/wrappers/ErrorPage";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { UserPayload } from "../interfaces";
import { agent } from "../api/agent";

const userQuery = {
  queryKey: ["current-user"],
  queryFn: async () => {
    const { data }: AxiosResponse<UserPayload> =
      await agent.User.getCurrentUser();
    return data;
  },
};

const Error = () => {
  const error = useRouteError();
  const { data:user } = useQuery(userQuery);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <Wrapper>
          <div className="section-center">
            <h1>404</h1>
            <h4>Opps! Page not found</h4>
            <p>Sorry, the page you tried cannot be found</p>
            <Link to={user ? "/dashboard" : "/"}>
              {user ? "back to dashboard" : "back home"}
            </Link>
          </div>
        </Wrapper>
      );
    }
  }
  return <Wrapper>There was an error</Wrapper>;
};
export default Error;
