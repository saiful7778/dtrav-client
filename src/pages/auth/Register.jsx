import { Form, Formik } from "formik";
import { Input } from "@/components/formik/Input";
import { FaUserAstronaut, FaEnvelope, FaLock } from "react-icons/fa";
import { Button } from "keep-react";
import { registerSchema } from "@/lib/schemas/authectication";
import Password from "@/components/formik/Password";

const Register = () => {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (e, { resetForm }) => {
    console.log(e);
    resetForm();
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
            icon={<FaUserAstronaut size={19} />}
          />
          <Input
            type="email"
            placeholder="Valid email"
            label="Your email"
            name="email"
            icon={<FaEnvelope size={19} />}
          />
          <Password
            placeholder="Password"
            label="Password"
            name="password"
            icon={<FaLock size={19} />}
          />
          <Password
            placeholder="Confirm password"
            label="Confirm password"
            name="confirmPassword"
            icon={<FaLock size={19} />}
          />
          <Button className="w-full" type="submit" size="sm">
            Register
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
