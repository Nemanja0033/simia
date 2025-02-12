import { useState } from "react";
import { loginWithEmail } from "../api/login";
import { signUpWithEmail } from "../api/signIn";
import { useAuth } from "../context/authContext";

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const { setIsAuth, setUserName } = useAuth();

  const handleStateChange = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="w-full z-10 h-full flex justify-center md:mt-36 mt-40 overflow-hidden">
      <div className="md:w-1/3 w-11/12 p-6 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold text-primary">
            {!isSignUp
              ? "Sign up and join groups and share content"
              : "Welcome back!"}
          </h1>
        </div>

        <div className="space-y-4">
          {!isSignUp && (
            <label className="input input-bordered flex items-center gap-2 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
                />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          )}

          <label className="input input-bordered flex items-center gap-2 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
              />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
              />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <div className="mt-4 text-center">
          <span
            className="text-sm text-primary cursor-pointer hover:underline"
            onClick={handleStateChange}
          >
            {!isSignUp ? "Already have an account?" : "Create New Account"}
          </span>
          <button
            onClick={() =>
              !isSignUp
                ? signUpWithEmail(setIsAuth, setUserName, email, password, username)
                : loginWithEmail(setIsAuth, email, password)
            }
            className="w-full bg-primary text-white py-2 mt-4 rounded-md hover:bg-primary-dark transition duration-200"
          >
            {!isSignUp ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
