import { Wrapper } from "../assets/wrappers/LandingNavBar";

interface Props {
  className?: string;
}

const LandingNavBar = ({ className }: Props) => {
  return (
    <Wrapper className={className ? className : ""}>
      <h1 className="logo">mern app</h1>
    </Wrapper>
  );
};
export default LandingNavBar;
