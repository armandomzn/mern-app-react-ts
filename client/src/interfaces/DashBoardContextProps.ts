export interface DashBoardContextProps {
  isDarkTheme: boolean;
  showSidebar: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => void;
  user: {
    name: string;
  };
  toggleLogoutContainer: (state: boolean) => void;
  isLogoutContainer: boolean;
}
