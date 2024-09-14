import { lazyImport } from "src/utils/lazyImport";

import "./style.scss";
import { ROUTES } from "src/utils/constants";

const { Page404 } = lazyImport(() => import("src/pages/Error/"), "Page404");
export const publicRoutes = [
  {
    path: ROUTES.PUBLIC.PAGE_NOT_FOUND.INDEX,
    element: <Page404 />,
  },
];
