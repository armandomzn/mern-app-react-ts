import { useDashBoardContext } from "../pages/DashboardLayout";
import { links } from "../utils/links";
import { NavLink } from "react-router-dom";

interface Props {
  isBigSidebar?: boolean;
}

const NavLinks = ({ isBigSidebar }: Props) => {
  const { toggleSidebar } = useDashBoardContext();
  return (
    <div className="nav-links">
      {links.map(({ text, path, icon }) => {
        return (
          <NavLink
            key={text}
            to={path}
            className="nav-link"
            onClick={isBigSidebar ? undefined : toggleSidebar}
          >
            {icon} {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
