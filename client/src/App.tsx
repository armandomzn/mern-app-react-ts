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
import ResetPassword, {
  resetPasswordAction,
  resetPasswordLoader,
} from "./components/ResetPassword";
import ForgotPassword, {
  forgotPasswordAction,
} from "./components/ForgotPassword";
import ProfileUpdatePassword, {
  profileUpdatePasswordAction,
} from "./pages/ProfileUpdatePassword";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorElement } from "./components";

checkDefaultTheme();

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15,
    },
  },
});

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
        path: "user/reset-password",
        element: <ResetPassword />,
        loader: resetPasswordLoader,
        action: resetPasswordAction,
      },
      {
        path: "user/forgot-password",
        element: <ForgotPassword />,
        action: forgotPasswordAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction(queryClient),
          },
          {
            path: "admin",
            element: <Admin />,
            loader: loaderAdmin,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader(queryClient),
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: "profile/update-password",
            element: <ProfileUpdatePassword />,
            action: profileUpdatePasswordAction,
          },
          {
            path: "delete-profile-image",
            action: deleteProfileAction(queryClient),
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader(queryClient),
            action: editJobAction(queryClient),
          },
          { path: "delete-job/:id", action: deleteJobAction(queryClient) },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
