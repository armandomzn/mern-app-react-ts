import { Wrapper } from "../assets/wrappers/StatContainer";
import { FaBan, FaCalendarCheck, FaSuitcase } from "react-icons/fa6";
import StatItem from "./StatItem";

interface Props {
  defaultStats: { pending: number; interview: number; declined: number };
}
const StatsContainer = ({
  defaultStats: { pending, interview, declined },
}: Props) => {
  const stats = [
    {
      title: "interviews scheduled",
      count: interview,
      icon: <FaCalendarCheck />,
      color: "#a5f3fc",
      backgroundColor: "#0891b2",
    },
    {
      title: "pending applications",
      count: pending,
      icon: <FaSuitcase />,
      color: "#fef08a",
      backgroundColor: "#eab308",
    },
    {
      title: "declined jobs",
      count: declined,
      icon: <FaBan />,
      color: "#fecaca",
      backgroundColor: "#dc2626",
    },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return (
          <StatItem
            count={item.count}
            title={item.title}
            key={item.title}
            icon={item.icon}
            color={item.color}
            backgroundColor={item.backgroundColor}
          />
        );
      })}
    </Wrapper>
  );
};
export default StatsContainer;
