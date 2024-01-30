import { Wrapper } from "../assets/wrappers/MiniSpinner";

interface Props {
  isDarkTheme: boolean;
}
const MiniSpinner = ({ isDarkTheme }: Props) => {
  return (
    <Wrapper viewBox="0 0 50 50" $isDarkTheme={isDarkTheme}>
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
      />
    </Wrapper>
  );
};
export default MiniSpinner;
