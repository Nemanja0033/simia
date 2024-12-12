import { useState } from "react";
import { loginWithEmail } from "../../api/login";
import { signUpWithEmail } from "../../api/signIn";
import { useAuth } from "../../context/authContext";


const LoginForm = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const { setIsAuth, setUserName } = useAuth();

    const handleStateChange = () => {
        setIsSignUp(!isSignUp)
    }

  return (
    <div className="w-full z-10 h-screen flex justify-center items-center overflow-hidden">
  <div className="md:w-1/3 w-11/12 p-6 rounded-lg shadow-lg">
    
    <div className="text-center mb-6">
      <h1 className="text-lg font-semibold">
        {!isSignUp 
          ? 'Sign up and join groups and share content' 
          : 'Welcome back!'}
      </h1>
    </div>
    
    <div className="space-y-4">
    {
        !isSignUp ? (
            <div>
                <label htmlFor="username" className="block text-sm font-medium">Username</label>
                <input
                className="w-full border bg-transparent border-gray-700 rounded-md p-2 mt-1 focus:ring-2 focus:ring-primary focus:outline-none"
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
        )
        :
        ''
    }
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          className="w-full border border-gray-300 bg-transparent rounded-md p-2 mt-1 focus:ring-2 focus:ring-primary focus:outline-none"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">Password</label>
        <input
          className="w-full border border-gray-300 bg-transparent rounded-md p-2 mt-1 focus:ring-2 focus:ring-primary focus:outline-none"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
    
    <div className="mt-4 text-center">
      <span
        className="text-sm text-gray-500 cursor-pointer hover:underline"
        onClick={handleStateChange}
      >
        {!isSignUp ? 'Already have an account?' : 'Create New Account'}
      </span>
      <button
        onClick={
          !isSignUp
            ? () => signUpWithEmail(setIsAuth, setUserName, email, password, username)
            : () => loginWithEmail(setIsAuth, email, password)
        }
        className="w-full bg-primary text-white py-2 mt-4 rounded-md hover:bg-primary-dark transition duration-200"
      >
        {!isSignUp ? 'Sign Up' : 'Login'}
      </button>
    </div>
  </div>
</div>

  )
}

export default LoginForm