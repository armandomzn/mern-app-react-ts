import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  EditJob,
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
import { addJobAction } from "./pages/AddJob";
import { allJobsLoader } from "./pages/AllJobs";
import { checkDefaultTheme } from "./utils/checkDefaultTheme";
import { editJobAction, editJobLoader } from "./pages/EditJob";
import { deleteJobAction } from "./pages/DeleteJob";
import { loaderAdmin } from "./pages/Admin";
import { deleteProfileAction, profileAction } from "./pages/Profile";
import { statsLoader } from "./pages/Stats";
import VerifyEmail, { verifyEmailLoader } from "./pages/VerifyEmail";
import Success from "./pages/Success";

checkDefaultTheme();

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
        path: "success",
        element: <Success />,
      },
      {
        path: "user/verify-email",
        element: <VerifyEmail />,
        loader: verifyEmailLoader,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          { index: true, element: <AddJob />, action: addJobAction },
          { path: "admin", element: <Admin />, loader: loaderAdmin },
          { path: "all-jobs", element: <AllJobs />, loader: allJobsLoader },
          { path: "stats", element: <Stats />, loader: statsLoader },
          { path: "profile", element: <Profile />, action: profileAction },
          { path: "delete-profile-image", action: deleteProfileAction },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          { path: "delete-job/:id", action: deleteJobAction },
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
