import { useEffect, useState } from "react";
import useNavigationState from "../hooks/useNavigationState";
import { MiniSpinner } from ".";

interface Props {
  nameState: string;
  optionalMiniSpinnerColor?: string;
  optionalClassName?: string;
  optionalButtonText?: string;
  currentFormAction?: string;
}

const SubmitBtn = ({
  nameState,
  optionalMiniSpinnerColor,
  optionalClassName,
  optionalButtonText,
  currentFormAction,
}: Props) => {
  const { isSubmitting, isLoading, formAction } = useNavigationState();
  const [status, setStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    return () => {
      setStatus({});
    };
  }, [isLoading]);
  const isCurrentFormSubmitting = currentFormAction
    ? formAction === currentFormAction && isSubmitting
    : isSubmitting;

  return (
    <button
      className={`btn ${optionalClassName || ""}`}
      disabled={status[nameState] && isCurrentFormSubmitting}
      onClick={() => {
        setStatus((prev) => {
          return {
            ...prev,
            [nameState]: true,
          };
        });
      }}
    >
      {status[nameState] && isCurrentFormSubmitting ? (
        <MiniSpinner color={optionalMiniSpinnerColor} />
      ) : (
        optionalButtonText || "submit"
      )}
    </button>
  );
};
export default SubmitBtn;
