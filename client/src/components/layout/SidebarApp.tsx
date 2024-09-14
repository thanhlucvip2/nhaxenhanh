"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useProfile } from "src/hooks/useProfile";
import { SIDE_BAR } from "src/utils/constants";
import { ROLES } from "src/utils/enums";
import { Sidebar } from "src/utils/type";
import { Link } from "react-router-dom";

type SidebarProps = {
  isShowSidebar: boolean;
  onClose: () => void;
};

export const SidebarApp = (props: SidebarProps) => {
  const { userProfile } = useProfile();
  const [sidebar, setSidebar] = useState<Sidebar[]>(SIDE_BAR);
  const location = useLocation();
  const currentPathname = location.pathname;
  useEffect(() => {
    const currentPathList = currentPathname.split("/");
    const findIndex = SIDE_BAR.findIndex(
      (item) => currentPathList[1] === item.ROUTES && item.CHILDREN
    );
    if (findIndex >= 0) {
      const newSidebar = [...SIDE_BAR];
      newSidebar[findIndex].IS_SHOW_MENU = true;
      setSidebar(newSidebar);
    }
  }, [currentPathname]);

  return (
    <div className="relative">
      <div
        className={clsx(
          props.isShowSidebar &&
            "w-screen h-screen backdrop-blur-sm absolute sm:w-0 sm:h-0"
        )}
        onClick={() => props.onClose()}
      ></div>
      <aside
        id="logo-sidebar"
        className={clsx(
          "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-main2 dark:border-gray-700",
          props.isShowSidebar ? "transform-none" : "-translate-x-full"
        )}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-main2">
          {sidebar.map((item, index) => {
            return (
              <ul key={index} className="space-y-2 font-medium">
                {userProfile?.roleUser === ROLES.ADMIN ||
                (userProfile?.roleUser === ROLES.USER &&
                  item.ROLE === userProfile?.roleUser) ? (
                  <li className="mt-1">
                    {item.CHILDREN ? (
                      <>
                        <button
                          type="button"
                          className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                          aria-controls="dropdown-example"
                          onClick={() => {
                            const newSidebar = [...sidebar];
                            newSidebar[index].IS_SHOW_MENU = newSidebar[index]
                              .IS_SHOW_MENU
                              ? false
                              : true;
                            setSidebar(newSidebar);
                          }}
                          data-collapse-toggle="dropdown-example"
                        >
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 21"
                          >
                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                          </svg>
                          <span className="flex-1 ml-3 text-left whitespace-nowrap">
                            {item.LABEL}
                          </span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeWidth="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </button>
                        <ul
                          id="dropdown-example"
                          className={clsx(
                            "py-2 space-y-2",
                            !item.IS_SHOW_MENU && "hidden"
                          )}
                        >
                          {item.CHILDREN.map((item2, index) => {
                            return (
                              <div key={index}>
                                {userProfile?.roleUser === ROLES.ADMIN ||
                                (userProfile?.roleUser === ROLES.USER &&
                                  item2.ROLE === userProfile?.roleUser) ? (
                                  <li>
                                    <Link
                                      onClick={props.onClose}
                                      to={`${item.ROUTES}/${item2.ROUTES}`}
                                      className={clsx(
                                        "flex items-center w-auto p-2 text-gray-900 transition duration-75 rounded-lg pl-3 ml-9 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
                                        currentPathname ===
                                          `/${item.ROUTES}/${item2.ROUTES}` ||
                                          currentPathname ===
                                            `/${item.ROUTES}${item2.ROUTES}`
                                          ? "bg-gray-100 dark:bg-gray-700 group"
                                          : ""
                                      )}
                                    >
                                      {item2.LABEL}
                                    </Link>
                                  </li>
                                ) : null}
                              </div>
                            );
                          })}
                        </ul>
                      </>
                    ) : (
                      <Link
                        onClick={props.onClose}
                        to={item.ROUTES}
                        className={clsx(
                          "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
                          currentPathname === `/${item.ROUTES}` &&
                            "bg-gray-100 dark:bg-gray-700 group"
                        )}
                      >
                        <svg
                          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 21"
                        >
                          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span className="ml-3">{item.LABEL}</span>
                      </Link>
                    )}
                  </li>
                ) : null}
              </ul>
            );
          })}
        </div>
      </aside>
    </div>
  );
};
