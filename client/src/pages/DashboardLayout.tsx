import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Wrapper } from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { DashBoardContextProps } from "../interfaces/DashBoardContextProps";

interface Props {
  isDarkThemeEnabled: boolean;
}

const DashBoardContext = createContext<DashBoardContextProps | undefined>(
  undefined
);
const DashboardLayout = ({ isDarkThemeEnabled }: Props) => {
  const user = { name: "john" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
  const [isLogoutContainer, setIsLogoutContainer] = useState(false);

  const logoutUser = () => {
    console.log("logout user");
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
              <Outlet />
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
