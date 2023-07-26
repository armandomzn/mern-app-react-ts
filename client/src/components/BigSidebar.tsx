import { NavLinks } from ".";
import { Wrapper } from "../assets/wrappers/BigSidebar";
import { useDashBoardContext } from "../pages/DashboardLayout";

const BigSidebar = () => {
  const { showSidebar, isDarkTheme } = useDashBoardContext();
  return (
    <Wrapper isDarkTheme={isDarkTheme}>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <h4 className="logo">mern app</h4>
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
