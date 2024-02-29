export interface StatsProps {
  defaultStats: {
    pending: number;
    interview: number;
    declined: number;
  };
  monthlyJobs: {
    date: string;
    count: number;
  }[];
}
