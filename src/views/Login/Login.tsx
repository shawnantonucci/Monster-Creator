import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "../Register/RegisterForm";

const Login = ({ setLogin }: any) => {
  const [loginOrSignup, setLoginOrSignup] = useState(true);

  return (
    <div>
      {loginOrSignup ? (
        <LoginForm
          setLoginOrSignup={setLoginOrSignup}
          loginOrSignup={loginOrSignup}
        />
      ) : (
        <RegisterForm
          setLoginOrSignup={setLoginOrSignup}
          loginOrSignup={loginOrSignup}
        />
      )}
    </div>
  );
};

export default Login;
