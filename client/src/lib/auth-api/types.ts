export type AuthUser = {
  id: string;
  email: string;
  roleUser: "ADMIN" | "USER";
  fullName: string;
};

export type UserResponse = {
  data: {
    token: string;
  };
};
