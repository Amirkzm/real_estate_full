import { useState } from "react";
import { Button } from "../../components/button";
import "./register.scss";
import axios from "axios";

type AuthProps = {
  pageUsage?: "LOGIN" | "REGISTER";
};

const Auth: React.FC<AuthProps> = ({ pageUsage = "LOGIN" }) => {
  const [isLogin, setIsLogin] = useState<boolean>(pageUsage === "LOGIN");

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log(username, email, password);

    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="authPage">
      <div className="mainContainer">
        <div className={`card ${isLogin ? "regActive" : ""} `}>
          <div className={`registerForm`}>
            <form onSubmit={formSubmitHandler}>
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
            <form>
              <h1>Login</h1>
              <input name="email" type="text" placeholder="Email" />
              <input name="password" type="password" placeholder="Password" />
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
