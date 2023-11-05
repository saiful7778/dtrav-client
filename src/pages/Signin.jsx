/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import useInputValue from "../hooks/useInput";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState, useContext } from "react";
import AuthMethod from "../components/AuthMethod";
import { AuthData } from "../hooks/AuthContext";
import checkPass from "../utility/checkPass";
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router-dom";
import checkEmail from "../utility/checkEmail";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const Signin = () => {
  const { signIn } = useContext(AuthData);
  const [showPass, setShowPass] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = useInputValue("");
  const password = useInputValue("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorStatus("");
    setSpinner(true);

    if (!checkPass(password.value)) {
      setErrorStatus(
        "Password must required: Minimum 6 characters. Capital letter. Special character."
      );
      setSpinner(false);
      return;
    }
    signIn(email.value, password.value)
      .then((result) => {
        swal({
          title: "Successfully login!",
          text: `${result.user.displayName}, is now loged in!`,
          icon: "success",
        });
        if (location.state) {
          navigate(location.state);
        }
        setErrorStatus("");
        setSpinner(false);
      })
      .catch((err) => {
        swal({
          title: err.code,
          icon: "error",
        });
        console.log(err.message);
        setErrorStatus(err.code);
        setSpinner(false);
      });
  };

  const handleForgetPass = () => {
    setErrorStatus("");
    if (!checkEmail(email.value)) {
      return setErrorStatus("Enter valid email address");
    }
    sendPasswordResetEmail(auth, email.value)
      .then(() => {
        swal({
          title: "Mail will be sent!",
          icon: "success",
        });
      })
      .catch((err) => {
        swal({
          title: err.code,
          icon: "error",
        });
        console.log(err.message);
        setErrorStatus(err.code);
      });
  };

  return (
    <div className="md:w-2/5 p-4 w-full mx-auto shadow-lg border border-gray-300 rounded-md">
      <h2 className="text-center text-2xl font-semibold mb-2">
        Sign in your account
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
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
          <button
            onClick={handleForgetPass}
            className="text-sm text-gray-500"
            type="button"
          >
            Forget password?
          </button>
        </div>
        {errorStatus && (
          <p className="text-red-600 text-sm my-4">{errorStatus}</p>
        )}
        <button className="btn-pri justify-center" type="submit">
          {spinner ? <span className="spinner"></span> : "Sign in"}
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
