import * as React from "react";

import { useUser } from "./auth";
import { ROLES } from "src/utils/enums";

type RoleTypes = keyof typeof ROLES;

export const useAuthorization = () => {
  const user = useUser();

  if (!user.data) {
    throw Error("User does not exist!");
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (!user.data) return false;

      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles?.includes(user.data.roleUser);
      }

      return true;
    },
    [user.data]
  );

  return { checkAccess, role: user.data.roleUser };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== "undefined") {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
