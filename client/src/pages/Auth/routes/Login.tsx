import * as z from "zod";

import { Loading } from "src/components/loading/loading";
import { useLoading } from "src/hooks/useLoading";
import { Input } from "src/components/input/input";
import { Form } from "src/components/form/form";

import { LoginValues } from "../types";
import "./Login.scss";
import { useLogin } from "src/lib/auth";
import { useNavigate } from "react-router-dom";
import { useNotification } from "src/hooks/useNotification";

export const Login = () => {
  const { addNotification } = useNotification();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const login = useLogin();

  const schema = z.object({
    email: z
      .string()
      .nonempty("Vui lòng nhập email")
      .email("Email sai định dạng"),
    password: z
      .string()
      .nonempty("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu ít nhất 8 ký tự")
      .max(20, "Mật khẩu tối đa 20 ký tự")
      .regex(
        /([A-Z]+[a-z]+[!@#$%+\-=]+)|([A-Z]+[a-z]+[0-9]+)|([A-Z]+[0-9]+[a-z]+)|([A-Z]+[0-9]+[!@#$%+\-=]+)|([A-Z]+[!@#$%+\-=]+[0-9]+)|([A-Z]+[!@#$%+\-=]+[a-z]+)|([a-z]+[A-Z]+[0-9]+)|([a-z]+[A-Z]+[!@#$%+\-=]+)|([a-z]+[0-9]+[A-Z]+)|([a-z]+[0-9]+[!@#$%+\-=]+)|([a-z]+[!@#$%+\-=]+[0-9]+)|([a-z]+[!@#$%+\-=]+[A-Z]+)|([0-9]+[A-Z]+[a-z]+)|([0-9]+[A-Z]+[!@#$%+\-=]+)|([0-9]+[a-z]+[A-Z]+)|([0-9]+[a-z]+[!@#$%+\-=]+)|([0-9]+[!@#$%+\-=]+[A-Z]+)|([0-9]+[!@#$%+\-=]+[a-z]+)|([!@#$%+\-=]+[a-z]+[A-Z]+)|([!@#$%+\-=]+[a-z]+[0-9]+)|([!@#$%+\-=]+[A-Z]+[a-z]+)|([!@#$%+\-=]+[A-Z]+[0-9]+)|([!@#$%+\-=]+[0-9]+[A-Z]+)|([!@#$%+\-=]+[0-9]+[a-z]+)/g,
        "Định dạng mật khẩu bao gồm số, chử thường và in hoa"
      ),
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          nhaxenhanh
          <Loading />
        </a>
        <div className="w-full border bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đăng nhập
            </h1>
            <Form<LoginValues, typeof schema>
              onSubmit={async (values) => {
                setLoading(true);
                await login
                  .mutateAsync(values)
                  .then(() => {
                    navigate(`/`);
                    addNotification({
                      message: "Đăng nhập thành công!",
                      type: "success",
                    });
                    setLoading(false);
                  })
                  .catch(() => {
                    addNotification({
                      message: "Tài khoản mật khẩu không chính xác!",
                      type: "error",
                    });
                    setLoading(false);
                  });
              }}
              className="space-y-4 md:space-y-6"
              schema={schema}
              id="login-form"
            >
              {({ register, formState }) => (
                <>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="name@company.com"
                      registration={register("email")}
                      error={formState.errors["email"]?.message}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      registration={register("password")}
                      error={formState.errors["password"]?.message}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="/"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                </>
              )}
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};
