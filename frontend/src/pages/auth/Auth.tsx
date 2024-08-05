import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import "./auth.scss";
import usePostData from "../../hooks/usePostData";
import { useUser } from "../../context/userProvider";
import { useNavigate } from "react-router-dom";
import { prepareUserObj } from "../../lib/utils";
import { useToastifyResponse } from "../../hooks";

type AuthProps = {
  pageUsage?: "LOGIN" | "REGISTER";
};

const Auth: React.FC<AuthProps> = ({ pageUsage = "LOGIN" }) => {
  const [isLogin, setIsLogin] = useState<boolean>(pageUsage === "LOGIN");
  const navigate = useNavigate();

  useEffect(() => {
    if (pageUsage === "LOGIN") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [pageUsage]);

  const { setUser } = useUser();

  const toastifyResponseRegister = useToastifyResponse({
    endpoint: "/auth/register",
    onSuccess: (res) => {
      setUser(prepareUserObj(res?.data.data));
      navigate("/");
      return "Welcome!";
    },
  });
  const toastifyResponseLogin = useToastifyResponse({
    endpoint: "/auth/login",
    onSuccess: (res) => {
      const loginUserData = prepareUserObj(res?.data.data);
      setUser(loginUserData);
      navigate("/");
      return "Welcome back!";
    },
  });

  const registerFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    toastifyResponseRegister({ data: { username, email, password } });
  };

  const loginFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    toastifyResponseLogin({ data: { username, password } });
  };

  return (
    <div className="authPage">
      <div className="mainContainer">
        <div className={`card ${isLogin ? "regActive" : ""} `}>
          <div className={`registerForm`}>
            <form onSubmit={registerFormHandler}>
              <h1>Create an Account</h1>
              <input name="username" type="text" placeholder="Username" />
              <input name="email" type="text" placeholder="Email" />
              <input name="password" type="password" placeholder="Password" />
              <Button>Register</Button>
              <div
                onClick={() => setIsLogin((prev) => !prev)}
                className="toggleForm"
              >
                Do you have an account?
              </div>
            </form>
          </div>

          <div className={`loginForm`}>
            <form onSubmit={loginFormHandler}>
              <h1>Login</h1>
              <input name="username" type="text" placeholder="Email" required />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
              />
              <Button>Login</Button>
              <div
                onClick={() => setIsLogin((prev) => !prev)}
                className="toggleForm"
              >
                Create an account
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="imageContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default Auth;
