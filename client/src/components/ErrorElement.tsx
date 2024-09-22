import { Wrapper } from "../assets/wrappers/ErrorElement";
import { useUser } from "../pages/DashboardLayout";

const ErrorElement = () => {
  const { isDarkTheme } = useUser();
  return (
    <Wrapper $isDarkTheme={isDarkTheme}>
      <h2>there was an error</h2>
      <p>
        Oops, there was an error showing the current component, please, try
        again later.
      </p>
    </Wrapper>
  );
};
export default ErrorElement;
