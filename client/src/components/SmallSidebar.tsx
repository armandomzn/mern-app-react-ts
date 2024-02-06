import { NavLinks } from ".";
import { Wrapper } from "../assets/wrappers/SmallSidebar";
import { useDashBoardContext } from "../pages/DashboardLayout";
import { FaTimes } from "react-icons/fa";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar, isDarkTheme } = useDashBoardContext();

  return (
    <Wrapper $isDarkTheme={isDarkTheme}>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <h4 className="logo">mern app</h4>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
