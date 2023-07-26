import { Wrapper } from "../assets/wrappers/ThemeToggle";
import { useDashBoardContext } from "../pages/DashboardLayout";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

const ThemeToggle = () => {
  const { toggleDarkTheme, isDarkTheme } = useDashBoardContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? <BsSunFill className="toggle-icon" /> : <BsMoonFill />}
    </Wrapper>
  );
};
export default ThemeToggle;
