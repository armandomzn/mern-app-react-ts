import { createContext, useContext, useState } from "react";
import {
  LoaderFunction,
  Outlet,
  redirect,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { Wrapper } from "../assets/wrappers/Dashboard";
import { BigSidebar, Loading, Navbar, SmallSidebar } from "../components";
import { agent } from "../api/agent";
import { AxiosResponse } from "axios";
import { checkDefaultTheme } from "../utils/checkDefaultTheme";
import { DashBoardContextProps, UserPayload } from "../interfaces";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { showToast } from "../utils/showToast";

const userQuery = {
  queryKey: ["current-user"],
  queryFn: async () => {
    const { data }: AxiosResponse<UserPayload> =
      await agent.User.getCurrentUser();
    return data;
  },
};

interface Props {
  queryClient: QueryClient;
}

const DashBoardContext = createContext<DashBoardContextProps | undefined>(
  undefined
);

// The loaders from react router dom allow us to provide data to some route before it renders, always needs to return a value
export const dashboardLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async () => {
    // The returned data is immediately available to the component.
    try {
      return await queryClient.ensureQueryData(userQuery);
    } catch (error) {
      return redirect("/");
    }
  };

export type ContextType = {
  user: UserPayload;
  isDarkTheme: boolean;
};

const DashboardLayout = ({ queryClient }: Props) => {
  // We use the useLoaderData hook to get the data from loader
  // In this case we get the token from the server
  // const user = useQuery(userQuery).data as UserPayload;
  const user = useQuery(userQuery).data as UserPayload;
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  // We use navigate instead of redirect when logout because redirect only works for actions and loaders functions
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);
  const [isLogoutContainer, setIsLogoutContainer] = useState(false);

  const logoutUser = async () => {
    // We go to main page when logout and delete the session cookie from the server when logout, this is server job
    navigate("/");
    // We invalidate all queries stored in cache
    await queryClient.invalidateQueries();
    const { data }: AxiosResponse = await agent.Auth.logout();
    showToast("logout", data?.message);
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
              {isPageLoading ? (
                <Loading />
              ) : (
                <Outlet context={{ user, isDarkTheme } satisfies ContextType} />
              )}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashBoardContext.Provider>
  );
};

export const useUser = () => {
  return useOutletContext<ContextType>();
};

export const useDashBoardContext = () => {
  const context = useContext(DashBoardContext);
  if (context === undefined) {
    throw new Error("useDashBoardContext must be within DashBoardLayout");
  }
  return context;
};

export default DashboardLayout;
