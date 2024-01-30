import { AxiosResponse, isAxiosError } from "axios";
import { ActionFunction, Form, Link, redirect } from "react-router-dom";
import { Wrapper } from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, MiniSpinner } from "../components";
import { agent } from "../api/agent";
import useNavigationState from "../hooks/useNavigationState";
import { toast } from "react-toastify";

interface Props {
  isDarkTheme: boolean;
}

// With this registerAction we can use formData API to manage form inputs
// we can handle data from the request before it is submitted even when the request has already been made
// Always needs to return some value
export const registerAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // This will convert and array of arrays key-value pairs in object
  // Ex -> [['name','armando']] -> {name:'armando'}
  const registerData = Object.fromEntries(formData);
  try {
    // We send the request to its corresponding endpoint
    const { data }: AxiosResponse = await agent.Auth.register(registerData);
    toast.success(data?.message);
    return redirect("/login");
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data.message[0]
        : error?.response?.data.message;
      toast.error(errorMessage, { autoClose: 5000 });
    }
    return error;
  }
};

const Register = ({ isDarkTheme }: Props) => {
  const { isSubmitting } = useNavigationState();
  return (
    <Wrapper $isDarkTheme={isDarkTheme}>
      <Form method="POST" className="form">
        <h1 className="logo">mern app</h1>
        <h4>register</h4>
        <FormRow name="name" type="text" defaultValue="john" />
        <FormRow
          name="lastName"
          type="text"
          defaultValue="doe"
          textLabel="last name"
        />
        <FormRow name="userName" type="text" defaultValue="johnDoe" />
        <FormRow name="location" type="text" defaultValue="earth" />
        <FormRow name="email" type="email" defaultValue="john@email.com" />
        <FormRow name="password" type="password" defaultValue="Secret123#" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? <MiniSpinner isDarkTheme={isDarkTheme} /> : "submit"}
        </button>
        <p className="member">
          already a member? <Link to="/login">Login</Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
