import { Input } from "@/components/formik/Input";
import TextArea from "@/components/formik/TextArea";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { addPackageSchema } from "@/lib/schemas/addPackage";
import { Form, Formik } from "formik";
import { Button, Spinner } from "keep-react";
import { useState } from "react";
import { FaPencilAlt, FaRegImage, FaDollarSign } from "react-icons/fa";
import Swal from "sweetalert2";

const AddPackage = () => {
  const [spinner, setSpinner] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user, token } = useAuth();

  const initalValues = {
    thumbnail: "",
    title: "",
    type: "",
    price: "",
    description: "",
    images: "",
  };

  const handleSubmit = async (e, { resetForm }) => {
    setSpinner(true);
    try {
      const { data: res } = await axiosSecure.post(
        `/package?email=${user.email}`,
        {
          thumbnail: e.thumbnail,
          title: e.title,
          type: e.type,
          price: e.price,
          description: e.description,
          images: [{ url: e.images }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Package is created",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Something went wrong",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err,
      });
    } finally {
      setSpinner(false);
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initalValues}
      validationSchema={addPackageSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-2">
        <Input
          type="url"
          placeholder="Thumbnail Image"
          label="Image link"
          name="thumbnail"
          disabled={spinner}
          icon={<FaRegImage size={19} />}
        />
        <Input
          type="text"
          placeholder="Title"
          label="Title"
          name="title"
          disabled={spinner}
          icon={<FaPencilAlt size={19} />}
        />
        <Input
          type="text"
          placeholder="type"
          label="Type"
          name="type"
          disabled={spinner}
          icon={<FaPencilAlt size={19} />}
        />
        <Input
          type="number"
          placeholder="Price"
          label="Price"
          name="price"
          disabled={spinner}
          icon={<FaDollarSign size={19} />}
        />
        <TextArea
          name="description"
          label="Description"
          placeholder="Description"
          disabled={spinner}
          icon={<FaPencilAlt size={19} />}
        />
        <Input
          type="url"
          placeholder="Image"
          label="Image link"
          name="images"
          disabled={spinner}
          icon={<FaRegImage size={19} />}
        />
        <Button
          className="w-full bg-pri hover:bg-pri/80 disabled:bg-pri/50"
          disabled={spinner}
          type="submit"
          size="sm"
        >
          {spinner ? <Spinner /> : "Add package"}
        </Button>
      </Form>
    </Formik>
  );
};

export default AddPackage;
