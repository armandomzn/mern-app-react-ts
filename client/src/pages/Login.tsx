import { Wrapper } from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, SubmitBtn } from "../components";
import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useNavigate,
} from "react-router-dom";
import { agent } from "../api/agent";
import { toast } from "react-toastify";
import { AxiosResponse, isAxiosError } from "axios";
import React, { useState } from "react";
import useDetectDarkMode from "../hooks/useDetectDarkMode";

export const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const loginForm = Object.fromEntries(formData);

  try {
    const { data }: AxiosResponse = await agent.Auth.login(loginForm);
    toast.success(data?.message);
    return redirect("/dashboard");
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);

      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data.message[0]
        : error?.response?.data.message;
      toast.error(errorMessage, { autoClose: 5000 });
    }
    return error;
  }
};

const Login = () => {
  const [emailOrUserName, setEmailOrUserName] = useState("email");
  const { isDarkMode } = useDetectDarkMode();

  const navigate = useNavigate();
  const handleEmailOrUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (emailRegex.test(e.target.value)) {
      setEmailOrUserName("email");
      return;
    }
    setEmailOrUserName("userName");
  };

  const loginDemoUser = async () => {
    const user = {
      email: "alice.smith@example.com",
      password: "Password1!",
    };
    try {
      await agent.Auth.login(user);
      toast.success("Testing User");
      navigate("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage = Array.isArray(error?.response?.data?.message)
          ? error?.response?.data.message
              .map((message: string) => message)
              .join(",")
          : error?.response?.data.message;
        toast.error(errorMessage, { autoClose: 5000 });
      }
      return error;
    }
  };
  return (
    <Wrapper $isDarkTheme={isDarkMode}>
      <Form method="POST" className="form">
        <h1 className="logo">mern app</h1>
        <h4>login</h4>
        <FormRow
          textLabel="email or username"
          name={emailOrUserName}
          type={emailOrUserName}
          defaultValue="john@email.com"
          handlerFunction={handleEmailOrUsername}
        />
        <FormRow name="password" type="password" defaultValue="Secret123#" />

        <SubmitBtn nameState={`login-submit`} optionalClassName="btn-block" />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p className="member">
          Not a member? <Link to="/register">register</Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
