import { AxiosResponse, isAxiosError } from "axios";
import {
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { agent } from "../api/agent";
import LandingNavBar from "../components/LandingNavBar";
import { Wrapper } from "../assets/wrappers/VerifyEmail";
import useDetectDarkMode from "../hooks/useDetectDarkMode";
import VerifyEmailImage from "../components/VerifyEmailImage";
import { showToast } from "../utils/showToast";

export const verifyEmailLoader: LoaderFunction = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data }: AxiosResponse = await agent.Auth.verifyEmail(params);
    return {
      message: data.message,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage: string | string[] = error?.response?.data?.message;
      showToast("verify-email-error", errorMessage, "error");
    }
    return redirect("/login");
  }
};

const VerifyEmail = () => {
  const { message } = (useLoaderData() as { message: string }) || "testing";
  const { isDarkMode } = useDetectDarkMode();
  return (
    <Wrapper $isDarkTheme={isDarkMode}>
      <LandingNavBar />
      <section>
        <div className="email-container">
          <div className="email-image">
            <VerifyEmailImage />
          </div>
          <h2 className="message">{message}</h2>
          <p>Thank you for veryfing your email address.</p>
          <p>You can safely close this tab.</p>
          <Link to="/login" className="btn">
            sign in
          </Link>
        </div>
      </section>
    </Wrapper>
  );
};

export default VerifyEmail;
