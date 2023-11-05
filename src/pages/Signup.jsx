import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState, useContext } from "react";
import AuthMethod from "../components/AuthMethod";
import checkPass from "../utility/checkPass";
import { AuthData } from "../hooks/AuthContext";
import { updateProfile } from "firebase/auth";
import swal from "sweetalert";

const Signup = () => {
  const { signUp } = useContext(AuthData);
  const [showPass, setShowPass] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
    setErrorStatus("");
    const form = e.target;
    const fullName = form.uname.value;
    const email = form.email.value;
    const pass = form.pass.value;
    const termsCheck = form.terms.checked;
    if (!checkPass(pass)) {
      setErrorStatus(
        "Password must required: Minimum 6 characters. Capital letter. Special character."
      );
      setSpinner(false);
      return;
    }
    if (!termsCheck) {
      setErrorStatus("Check terms and conditions");
      setSpinner(false);
      return;
    }
    signUp(email, pass)
      .then((result) => {
        const user = result.user;
        updateProfile(user, {
          displayName: fullName,
        }).then(() => {
          swal({
            title: "Account created successfully!",
            icon: "success",
          });
          setSpinner(false);
          setErrorStatus("");
          form.reset();
          navigate("/");
        });
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
  return (
    <div className="md:w-2/5 p-4 w-full mx-auto shadow-lg border border-gray-300 rounded-md">
      <h2 className="text-center text-2xl font-semibold mb-2">
        Create an account
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="input"
          type="text"
          placeholder="Full name"
          name="uname"
          required
        />
        <input
          className="input"
          type="email"
          placeholder="Email address"
          name="email"
          required
        />
        <div className="relative w-full">
          <input
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
        <label>
          <input type="checkbox" name="terms" required />
          <span className="text-sm text-gray-500 ml-2">
            Terms and conditions
          </span>
          <Link
            to="/terms_and_conditions"
            className="text-sm text-blue-500 ml-1 underline"
          >
            read
          </Link>
        </label>
        {errorStatus && (
          <p className="text-red-600 text-sm my-4">{errorStatus}</p>
        )}
        <button className="btn-pri justify-center" type="submit">
          {spinner ? <span className="spinner"></span> : "Sign up"}
        </button>
      </form>
      <p className="text-center mt-3 text-sm">
        Do you have an account?{" "}
        <Link className="text-blue-600 underline" to="/signin">
          Sign in
        </Link>
      </p>
      <AuthMethod />
    </div>
  );
};

export default Signup;
