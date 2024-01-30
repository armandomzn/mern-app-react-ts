import { createContext, useContext, useState } from "react";
import {
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Wrapper } from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { DashBoardContextProps } from "../interfaces/DashBoardContextProps";
import { checkDefaultTheme } from "../App";
import { UserPayload } from "../interfaces/UserPayloadProps";
import { agent } from "../api/agent";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const DashBoardContext = createContext<DashBoardContextProps | undefined>(
  undefined
);

// The loaders from react router dom allow us to provide data to some route before it renders, always needs to return a value
export const dashboardLoader: LoaderFunction = async () => {
  // The returned data is immediately available to the component.
  try {
    const { data }: AxiosResponse = await agent.User.getCurrentUser();
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  // We use the useLoaderData hook to get the data from loader
  // In this case we get the token from the server
  const user = useLoaderData() as UserPayload;

  // We use navigate instead of redirect when logout because redirect only works for actions and loaders functions
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);
  const [isLogoutContainer, setIsLogoutContainer] = useState(false);

  const logoutUser = async () => {
    // We go to main page when logout and delete the session cookie from the server when logout, this is server job
    navigate("/");
    const { data }: AxiosResponse = await agent.Auth.logout();
    toast.success(data?.message);
  };
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme.toString());
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const toggleLogoutContainer = (state: boolean) => {
    setIsLogoutContainer(state);
  };

  return (
    <DashBoardContext.Provider
      value={{
        toggleDarkTheme,
        toggleSidebar,
        showSidebar,
        isDarkTheme,
        logoutUser,
        user,
        toggleLogoutContainer,
        isLogoutContainer,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashBoardContext.Provider>
  );
};
export const useDashBoardContext = () => {
  const context = useContext(DashBoardContext);
  if (context === undefined) {
    throw new Error("useDashBoardContext must be within DashBoardLayout");
  }
  return context;
};
export default DashboardLayout;
