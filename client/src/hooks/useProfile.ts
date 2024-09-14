import { AuthUser } from "src/lib/auth-api";
import { create } from "zustand";

type User = {
  userProfile: AuthUser | null;
  setUser: (newUser: AuthUser) => void;
};

export const useProfile = create<User>((set) => ({
  userProfile: null,
  setUser: (newUser: AuthUser) =>
    set((): { userProfile: AuthUser } => ({
      userProfile: newUser,
    })),
}));
