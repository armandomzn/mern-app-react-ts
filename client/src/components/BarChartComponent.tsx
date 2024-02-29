import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
interface Props {
  monthlyJobs: { date: string; count: number }[];
}
const BarChartComponent = ({ monthlyJobs }: Props) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={400}
      style={{
        transition: "background 0.3s ease-in-out,color 0.3s ease-in-out",
      }}
    >
      <BarChart data={monthlyJobs} margin={{ top: 50, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          label={{
            value: "Job date",
            position: "center",
            dy: 30,
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
        <Tooltip
          wrapperStyle={{
            color: "var(--primary-400)",
            fontWeight: "bold",
            background:"green"
          }}
        />
        <Bar
          dataKey="count"
          fill="#14532d"
          stroke="#dcfce7"
          barSize={75}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;
