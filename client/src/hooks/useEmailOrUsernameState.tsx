import { useState } from "react";

const useEmailOrUsernameState = () => {
  const [emailOrUserName, setEmailOrUserName] = useState("email");

  const handleEmailOrUsername = (value: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (emailRegex.test(value)) {
      setEmailOrUserName("email");
      return;
    }
    setEmailOrUserName("userName");
  };

  return {
    emailOrUserName,
    handleEmailOrUsername,
  };
};
export default useEmailOrUsernameState;
