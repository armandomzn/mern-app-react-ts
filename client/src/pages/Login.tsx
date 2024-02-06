import { Wrapper } from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, MiniSpinner } from "../components";
import { ActionFunction, Form, Link, redirect } from "react-router-dom";
import { agent } from "../api/agent";
import { toast } from "react-toastify";
import { AxiosResponse, isAxiosError } from "axios";
import useNavigationState from "../hooks/useNavigationState";
import React, { useState } from "react";
interface Props {
  isDarkTheme: boolean;
}

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

const Login = ({ isDarkTheme }: Props) => {
  const { isSubmitting } = useNavigationState();
  const [emailOrUserName, setEmailOrUserName] = useState("email");
  const handleEmailOrUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (emailRegex.test(e.target.value)) {
      setEmailOrUserName("email");
      return;
    }
    setEmailOrUserName("userName");
  };
  return (
    <Wrapper $isDarkTheme={isDarkTheme}>
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
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? <MiniSpinner /> : "submit"}
        </button>
        <button type="submit" className="btn btn-block">
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
