import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  monthlyJobs: { date: string; count: number }[];
}

const AreaChartComponent = ({ monthlyJobs }: Props) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={400}
      style={{
        transition: "background 0.3s ease-in-out,color 0.3s ease-in-out",
      }}
    >
      <AreaChart data={monthlyJobs} margin={{ top: 50, bottom: 50 }}>
        <XAxis
          dataKey="date"
          label={{
            value: "Job date",
            position: "center",
            dy: 25,
            offset: 0,
            stroke: "var(--primary-400)",
          }}
          stroke="var(--text-color)"
          dy={10}
        />
        <YAxis
          allowDecimals={false}
          label={{
            value: "Job count",
            angle: -90,
            dx: -5,
            stroke: "var(--primary-400)",
          }}
          stroke="var(--text-color)"
          dy={-3}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          wrapperStyle={{
            color: "var(--primary-400)",
            fontWeight: "bold",
          }}
        />
        <Area type="monotone" dataKey="count" stroke="#14532d" fill="#dcfce7" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartComponent;
