import { Form, Formik } from "formik";
import { Input } from "@/components/formik/Input";
import {
  FaUserAstronaut,
  FaEnvelope,
  FaLock,
  FaRegImage,
} from "react-icons/fa";
import { Button, Spinner } from "keep-react";
import { registerSchema } from "@/lib/schemas/authectication";
import Password from "@/components/formik/Password";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosBase from "@/lib/config/axios.config";
import useAuth from "@/hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import SocialAuth from "@/components/SocialAuth";

const Register = () => {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const { register, googleAuth } = useAuth();

  const initialValues = {
    imageUrl: "",
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
      const res = await axiosBase.post("/authentication/register", {
        image: e.imageUrl || null,
        email: e.email,
        name: e.fullName,
        userID: user.uid,
      });
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Account is created",
        });
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          text: res.message,
        });
      }
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

  const handleGoogleRegister = async () => {
    try {
      const { user } = await googleAuth();
      await axiosBase.post("/authentication/register", {
        email: user.email,
        name: user.displayName,
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
            type="url"
            placeholder="Image link"
            label="Your image"
            name="imageUrl"
            disabled={spinner}
            icon={<FaRegImage size={19} />}
          />
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
      <SocialAuth handleGoogle={handleGoogleRegister} />
      <p className="mt-2 text-center">
        <Link className="underline" to="/authentication/login">
          Already have an account?
        </Link>
      </p>
    </div>
  );
};

export default Register;
