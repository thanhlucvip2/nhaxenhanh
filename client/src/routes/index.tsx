import { useRoutes, useLocation } from "react-router-dom";

import { useUser } from "src/lib/auth";

import { privateRoutes } from "./private";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { useEffect } from "react";

export const AppRoutes = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  useEffect(() => {
    const metaTitle = "nhaxenhanh";
    document.title = metaTitle;

    if (currentPath !== "/") {
      document.title =
        metaTitle + "-" + currentPath.slice(1).replace(/\//g, "-");
    }
  }, [currentPath]);

  const user = useUser();

  const routes = user.data ? protectedRoutes : privateRoutes;

  const element = useRoutes([...routes, ...publicRoutes]);
  // const element = useRoutes([]);

  return <div className="h-screen">{element}</div>;
};
