import { UserPayload } from "./UserPayloadProps";

export interface DashBoardContextProps {
  isDarkTheme: boolean;
  showSidebar: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => void;
  user: UserPayload;
  toggleLogoutContainer: (state: boolean) => void;
  isLogoutContainer: boolean;
}
