import { loginSchema } from "@/lib/schemas/authectication";
import { Formik, Form } from "formik";
import { Button, Spinner } from "keep-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Password from "@/components/formik/Password";
import { Input } from "@/components/formik/Input";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import SocialAuth from "@/components/SocialAuth";

const Login = () => {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, googleAuth } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (e, { resetForm }) => {
    setSpinner(true);
    try {
      const { user } = await login(e.email, e.password);
      Swal.fire({
        icon: "success",
        title: user.displayName,
        text: "Account successfully logged in!",
      });
      navigate(location.state ? location.state.from.pathname : "/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err,
      });
      console.error(err);
    } finally {
      setSpinner(false);
      resetForm();
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { user } = await googleAuth();
      Swal.fire({
        icon: "success",
        title: user.displayName,
        text: "Account successfully logged in!",
      });
      navigate(location.state ? location.state.from.pathname : "/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err,
      });
      console.error(err);
    }
  };

  return (
    <div>
      <h4 className="mb-2 text-center text-3xl font-bold">Login</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-2">
          <Input
            type="email"
            placeholder="Valid email"
            label="Your email"
            name="email"
            disabled={spinner}
            icon={<FaEnvelope size={19} />}
          />
          <Password
            placeholder="Password"
            label="Password"
            name="password"
            disabled={spinner}
            icon={<FaLock size={19} />}
          />
          <Button
            className="w-full bg-pri hover:bg-pri/80 disabled:bg-pri/50"
            disabled={spinner}
            type="submit"
            size="sm"
          >
            {spinner ? <Spinner /> : "Login"}
          </Button>
        </Form>
      </Formik>
      <SocialAuth handleGoogle={handleGoogleLogin} />
      <p className="mt-2 text-center">
        <Link className="underline" to="/authentication/register">
          Don{`'`}t have any account?
        </Link>
      </p>
    </div>
  );
};

export default Login;
