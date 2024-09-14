import { configureAuth } from "react-query-auth";

import cookie from "src/utils/cookie";
import { useProfile } from "src/hooks/useProfile";

import {
  loginWithEmailAndPassword,
  getUser,
  registerWithEmailAndPassword,
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
} from "./auth-api";

let userData: any = null;
async function handleUserResponse(data: UserResponse) {
  const {
    data: { token },
  } = data;
  cookie.setToken(token);

  if (userData === null) {
    userData = await getUser();
  }
  useProfile.setState({
    userProfile: userData,
  });

  return token;
}

async function userFn() {
  if (cookie.getToken()) {
    if (userData === null) {
      userData = await getUser();
    }
    useProfile.setState({
      userProfile: userData,
    });
    return userData;
  }
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  const token = await handleUserResponse(response);
  return token;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
  const token = await handleUserResponse(response);
  return token;
}

async function logoutFn() {
  cookie.clearToken();
}

const authConfig = {
  userFn,
  loginFn,
  registerFn,
  logoutFn,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);
