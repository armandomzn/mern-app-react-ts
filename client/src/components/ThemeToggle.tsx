import { Wrapper } from "../assets/wrappers/ThemeToggle";
import { useDashBoardContext } from "../pages/DashboardLayout";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

interface Props {
  className?: string;
  visible?: boolean;
}

const ThemeToggle = ({ className, visible }: Props) => {
  const { toggleDarkTheme, isDarkTheme } = useDashBoardContext();
  return (
    <Wrapper onClick={toggleDarkTheme} className={className} $visible={visible}>
      {isDarkTheme ? (
        <span className="toggle-icon">
          <BsSunFill />
        </span>
      ) : (
        <BsMoonFill />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;
