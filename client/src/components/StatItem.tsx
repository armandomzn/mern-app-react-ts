import { Wrapper } from "../assets/wrappers/StatItem";
import { useUser } from "../pages/DashboardLayout";

interface Props {
  count: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  backgroundColor: string;
}
const StatItem = ({ count, title, icon, color, backgroundColor }: Props) => {
  const { isDarkTheme } = useUser();
  return (
    <Wrapper
      $backgroundColor={backgroundColor}
      $color={color}
      $isDarkTheme={isDarkTheme}
    >
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h3>{title}</h3>
    </Wrapper>
  );
};
export default StatItem;
