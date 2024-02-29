import { useState } from "react";
import { Wrapper } from "../assets/wrappers/ChartsContainer";
import BarChartComponent from "./BarChartComponent";
import AreaChartComponent from "./AreaChartComponent";

interface Props {
  monthlyJobs: { date: string; count: number }[];
}
const ChartsContainer = ({ monthlyJobs }: Props) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>monthly jobs applications</h4>
      <button
        type="button"
        className="btn"
        onClick={() => setBarChart((prev) => !prev)}
      >
        {barChart ? "area chart" : "bar chart"}
      </button>
      {barChart ? (
        <BarChartComponent monthlyJobs={monthlyJobs} />
      ) : (
        <AreaChartComponent monthlyJobs={monthlyJobs} />
      )}
    </Wrapper>
  );
};
export default ChartsContainer;
