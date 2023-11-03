/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import useInputValue from "../hooks/useInput";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import AuthMethod from "../components/AuthMethod";

const Signin = () => {
  const [showPass, setShowPass] = useState(false);
  const email = useInputValue("");
  const password = useInputValue("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="md:w-2/5 p-4 w-full mx-auto shadow-lg border border-gray-200 rounded-md">
      <h2 className="text-center text-2xl font-semibold mb-2">
        Sign in your account
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-center"
      >
        <input
          {...email}
          className="input"
          type="email"
          placeholder="Email address"
          name="email"
          required
        />
        <div className="relative w-full">
          <input
            {...password}
            className="input"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            name="pass"
            required
          />
          <button
            onClick={() => setShowPass((prop) => !prop)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            type="button"
          >
            {showPass ? (
              <AiOutlineEye size={20} />
            ) : (
              <AiOutlineEyeInvisible size={20} />
            )}
          </button>
        </div>
        <div className="text-left w-full">
          <button className="text-sm text-gray-500" type="button">
            Forget password?
          </button>
        </div>
        <button className="btn-pri" type="submit">
          Sign in
        </button>
      </form>
      <p className="text-center mt-3 text-sm">
        Don't have an account?{" "}
        <Link className="text-blue-600 underline" to="/signup">
          Sign up
        </Link>
      </p>
      <AuthMethod />
    </div>
  );
};

export default Signin;
