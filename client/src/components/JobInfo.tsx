import { Wrapper } from "../assets/wrappers/JobInfo";

interface Props {
  icon: React.ReactNode;
  text: string;
}
const JobInfo = ({ icon, text }: Props) => {
  return (
    <Wrapper>
      <span>{icon}</span>
      <span>{text}</span>
    </Wrapper>
  );
};
export default JobInfo;
