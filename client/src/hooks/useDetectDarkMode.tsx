import { useState } from "react";
import { checkDefaultTheme } from "../utils/checkDefaultTheme";

const useDetectDarkMode = () => {
  const [isDarkMode, _] = useState(checkDefaultTheme);
  return { isDarkMode };
};
export default useDetectDarkMode;
