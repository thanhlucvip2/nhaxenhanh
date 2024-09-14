import { Navigate } from "react-router-dom";

import { lazyImport } from "src/utils/lazyImport";

import "./style.scss";
import { ROUTES } from "src/utils/constants";

const { Login } = lazyImport(() => import("src/pages/Auth/"), "Login");

export const privateRoutes = [
  {
    path: ROUTES.PRIVATE.LOGIN.INDEX,
    element: <Login />,
  },
  {
    path: ROUTES.PROTECTED.HOME.INDEX,
    element: <Navigate to={ROUTES.PRIVATE.LOGIN.INDEX} />,
  },
];
