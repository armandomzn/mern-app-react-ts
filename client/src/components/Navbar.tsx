import { Wrapper } from "../assets/wrappers/Navbar";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { useDashBoardContext } from "../pages/DashboardLayout";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  const { toggleSidebar } = useDashBoardContext();
  // const handleDropdownOver = (e: React.MouseEvent<EventTarget>) => {
  //   const element = e.target as Element;
  //   if (!element.classList.contains("main-logout-btn")) {
  //     toggleLogoutContainer(false);
  //   }
  // };
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="nav-btn" type="button" onClick={toggleSidebar}>
          <HiMiniBars3CenterLeft />
        </button>
        <div>
          <h4 className="logo">mern app</h4>
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
