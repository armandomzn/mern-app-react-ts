import { useEffect, useState } from "react";
import useNavigationState from "../hooks/useNavigationState";
import { MiniSpinner } from ".";

interface Props {
  nameState: string;
  optionalMiniSpinnerColor?: string;
  optionalClassName?: string;
  optionalButtonText?: string;
}

const SubmitBtn = ({
  nameState,
  optionalMiniSpinnerColor,
  optionalClassName,
  optionalButtonText,
}: Props) => {
  const { isSubmitting, isLoading } = useNavigationState();
  const [status, setStatus] = useState({ name: "" });

  useEffect(() => {
    return () => {
      setStatus({ name: "" });
    };
  }, [isLoading]);

  return (
    <button
      className={`btn ${optionalClassName && optionalClassName}`}
      disabled={status.name === nameState && isSubmitting}
      onClick={() => {
        setStatus({
          name: nameState,
        });
      }}
    >
      {status.name === nameState && isSubmitting ? (
        <MiniSpinner color={optionalMiniSpinnerColor} />
      ) : (
        optionalButtonText || "submit"
      )}
    </button>
  );
};
export default SubmitBtn;
