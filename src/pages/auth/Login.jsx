import { loginSchema } from "@/lib/schemas/authectication";
import { Formik } from "formik";
import { Button, Spinner } from "keep-react";
import { useState } from "react";
import { Form, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Password from "@/components/formik/Password";
import { Input } from "@/components/formik/Input";

const Login = () => {
  const [spinner, setSpinner] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (e, { resetForm }) => {
    setSpinner(true);
    console.log(e);
    resetForm();
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
            className="bg-pri hover:bg-pri/80 disabled:bg-pri/50 w-full"
            disabled={spinner}
            type="submit"
            size="sm"
          >
            {spinner ? <Spinner /> : "Login"}
          </Button>
        </Form>
      </Formik>
      <p className="mt-2 text-center">
        <Link className="underline" to="/authentication/register">
          Don{`'`}t have any account?
        </Link>
      </p>
    </div>
  );
};

export default Login;
