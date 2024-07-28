import { useState } from "react";
import { Button } from "../../components/button";
import "./auth.scss";
import usePostData from "../../hooks/usePostData";
import { useUser } from "../../context/userProvider";
import { useNavigate } from "react-router-dom";

type AuthProps = {
  pageUsage?: "LOGIN" | "REGISTER";
};

const Auth: React.FC<AuthProps> = ({ pageUsage = "LOGIN" }) => {
  const [isLogin, setIsLogin] = useState<boolean>(pageUsage === "LOGIN");
  const navigate = useNavigate();

  const { user, setUser } = useUser();
  const {
    isError: isLoginError,
    errorMessage: loginErrorMsg,
    isLoading: isLoadingLogin,
    postData: loginPostData,
  } = usePostData("/auth/login");

  const {
    isError: isRegisterError,
    errorMessage: registerErrorMsg,
    isLoading: isLoadingRegister,
    postData: registerPostData,
  } = usePostData("/auth/register");

  const registerFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await registerPostData({ username, email, password });
    if (res?.status == 200) {
      console.log("registeration successful");
      setUser(res.data);
      navigate("/");
    }
  };

  const loginFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const res = await loginPostData({
      username,
      password,
    });
    if (res?.status === 200) {
      console.log("Logged in");
      console.log(res.data);
      setUser(res.data);
      navigate("/");
    }
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
              {isRegisterError && (
                <div className="error">{registerErrorMsg}</div>
              )}
              <Button disabled={isLoadingRegister}>Register</Button>
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
              {isLoginError && <div className="error">{loginErrorMsg}</div>}
              <Button disabled={isLoadingLogin}>Login</Button>
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
