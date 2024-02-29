import { useEffect, useState } from "react";
import { checkDefaultTheme } from "../utils/checkDefaultTheme";

const useDetectDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(checkDefaultTheme);
  useEffect(() => {
    setIsDarkMode((prev) => !prev);
  }, [isDarkMode]);
  return { isDarkMode };
};
export default useDetectDarkMode;
