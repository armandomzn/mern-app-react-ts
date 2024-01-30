import { useNavigation } from "react-router-dom";

const useNavigationState = () => {
  const navigation = useNavigation();
  return {
    isSubmitting: navigation.state === "submitting",
    isIdle: navigation.state === "idle",
    isLoading: navigation.state === "loading",
  };
};
export default useNavigationState;
