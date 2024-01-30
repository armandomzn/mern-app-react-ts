import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { registerAction } from "./pages/Register";
import { loginAction } from "./pages/Login";
import { dashboardLoader } from "./pages/DashboardLayout";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkTheme = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login isDarkTheme={isDarkTheme} />,
        action: loginAction,
      },
      {
        path: "/register",
        element: <Register isDarkTheme={isDarkTheme} />,
        action: registerAction,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          { index: true, element: <AddJob /> },
          { path: "admin", element: <Admin /> },
          { path: "all-jobs", element: <AllJobs /> },
          { path: "stats", element: <Stats /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
