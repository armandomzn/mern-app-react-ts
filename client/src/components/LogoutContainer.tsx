import { useEffect, useRef, useState } from "react";
import { Wrapper } from "../assets/wrappers/LogoutContainer";
import { BiSolidUserCircle } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDashBoardContext } from "../pages/DashboardLayout";
import ThemeToggle from "./ThemeToggle";
const LogoutContainer = () => {
  const [showIsDarkMode, setShowIsDarkMode] = useState(false);
  const { user, logoutUser, toggleLogoutContainer, isLogoutContainer } =
    useDashBoardContext();
  const dropdownContainer = useRef<HTMLDivElement | null>(null);
  const logoutContainer = useRef<HTMLDivElement | null>(null);

  const handleDropdownOut = (e: React.MouseEvent<EventTarget>) => {
    if (!dropdownContainer.current || !logoutContainer.current) {
      return;
    }

    const { clientX, clientY } = e;
    if (dropdownContainer.current.contains(e.target as Element)) {
      const { left, right, bottom } =
        dropdownContainer.current.getBoundingClientRect();
      if (clientX >= right || clientX <= left - 1 || clientY >= bottom - 1) {
        toggleLogoutContainer(false);
      }
    }
    if (logoutContainer.current.contains(e.target as Element)) {
      const { left, right, top } =
        logoutContainer.current.getBoundingClientRect();
      if (clientX >= right || clientX <= left - 1 || clientY <= top - 1) {
        toggleLogoutContainer(false);
      }
    }
  };

  const handleDropdownOver = (e: React.MouseEvent<EventTarget>) => {
    if (
      e.target instanceof SVGElement ||
      (e.target as Element).classList.contains("dropdown")
    ) {
      return;
    }
    if (!(e.target as Element).classList.contains("logout-btn")) {
      toggleLogoutContainer(false);
    }
  };

  useEffect(() => {
    const windowSize = () => {
      setShowIsDarkMode(window.innerWidth <= 315);
    };
    window.addEventListener("resize", windowSize);
    return () => {
      window.removeEventListener("resize", windowSize);
    };
  }, []);

  return (
    <Wrapper>
      <div onMouseOver={handleDropdownOver} ref={logoutContainer}>
        <button
          type="button"
          className="logout-btn btn"
          onMouseEnter={() => toggleLogoutContainer(true)}
          onMouseLeave={handleDropdownOut}
        >
          {user.avatar ? (
            <img src={user.avatar} alt="user-avatar" className="avatar" />
          ) : (
            <span className="avatar">
              <BiSolidUserCircle />
            </span>
          )}
          {user.name}
          <IoMdArrowDropdown />
        </button>
      </div>

      <div
        className={isLogoutContainer ? "dropdown show-dropdown" : "dropdown"}
        ref={dropdownContainer}
        onMouseLeave={handleDropdownOut}
      >
        {showIsDarkMode && <ThemeToggle className="dropdown-btn btn" visible />}
        <button type="button" onClick={logoutUser} className="dropdown-btn btn">
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
