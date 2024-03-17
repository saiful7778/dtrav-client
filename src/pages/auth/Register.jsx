import { Form, Formik } from "formik";
import { Input } from "@/components/formik/Input";
import { FaUserAstronaut, FaEnvelope, FaLock } from "react-icons/fa";
import { Button, Spinner } from "keep-react";
import { registerSchema } from "@/lib/schemas/authectication";
import Password from "@/components/formik/Password";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosBase from "@/lib/config/axios.config";
import useAuth from "@/hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Register = () => {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (e, { resetForm }) => {
    setSpinner(true);
    try {
      const { user } = await register(e.email, e.password);
      await updateProfile(user, {
        displayName: e.fullName,
      });
      await axiosBase.post("/authentication/register", {
        email: e.email,
        name: e.fullName,
        userID: user.uid,
      });
      Swal.fire({
        icon: "success",
        title: "Account is created",
      });
      navigate("/");
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

  return (
    <div>
      <h4 className="mb-2 text-center text-3xl font-bold">Register</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-2">
          <Input
            type="text"
            placeholder="Full name"
            label="Your name"
            name="fullName"
            disabled={spinner}
            icon={<FaUserAstronaut size={19} />}
          />
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
          <Password
            placeholder="Confirm password"
            label="Confirm password"
            name="confirmPassword"
            disabled={spinner}
            icon={<FaLock size={19} />}
          />
          <Button
            className="w-full bg-pri hover:bg-pri/80 disabled:bg-pri/50"
            disabled={spinner}
            type="submit"
            size="sm"
          >
            {spinner ? <Spinner /> : "Register"}
          </Button>
        </Form>
      </Formik>
      <p className="mt-2 text-center">
        <Link className="underline" to="/authentication/login">
          Already have an account?
        </Link>
      </p>
    </div>
  );
};

export default Register;
