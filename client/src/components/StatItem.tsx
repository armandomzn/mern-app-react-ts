import { Wrapper } from "../assets/wrappers/StatItem";

interface Props {
  count: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  backgroundColor: string;
}
const StatItem = ({ count, title, icon, color, backgroundColor }: Props) => {
  return (
    <Wrapper $backgroundColor={backgroundColor} $color={color}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h3>{title}</h3>
    </Wrapper>
  );
};
export default StatItem;
