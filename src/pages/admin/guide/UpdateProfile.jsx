import { Input } from "@/components/formik/Input";
import TextArea from "@/components/formik/TextArea";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { guideSchema } from "@/lib/schemas/guide";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Button, Spinner } from "keep-react";
import { useState } from "react";
import { FaGraduationCap, FaPencilAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const [spinner, setSpinner] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user, userDetails, token } = useAuth();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["guide", "details"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/guide/${userDetails._id}`);
      return data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="my-10 flex justify-center">
        <Spinner color="info" size="xl" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-center text-xl font-bold">Something went wrong!</div>
    );
  }

  const initialEducationValue = {
    title: data?.guideDetails?.education?.title || "",
    details: data?.guideDetails?.education?.details || "",
  };
  const initialSkillsValue = {
    title: data?.guideDetails?.skills?.title || "",
    details: data?.guideDetails?.skills?.details || "",
  };
  const initialExperienceValue = {
    title: data?.guideDetails?.experience?.title || "",
    details: data?.guideDetails?.experience?.details || "",
  };

  const handleEducationSubmit = (e, { resetForm }) =>
    UpdateGuideData(
      "education",
      e,
      setSpinner,
      resetForm,
      axiosSecure,
      user,
      userDetails,
      token,
      refetch,
    );

  const handleSkillsSubmit = (e, { resetForm }) =>
    UpdateGuideData(
      "skills",
      e,
      setSpinner,
      resetForm,
      axiosSecure,
      user,
      userDetails,
      token,
      refetch,
    );

  const handleExperienceSubmit = (e, { resetForm }) =>
    UpdateGuideData(
      "experience",
      e,
      setSpinner,
      resetForm,
      axiosSecure,
      user,
      userDetails,
      token,
      refetch,
    );

  return (
    <>
      <Formik
        initialValues={initialEducationValue}
        validationSchema={guideSchema}
        onSubmit={handleEducationSubmit}
      >
        <Form className="space-y-2">
          <Input
            type="text"
            placeholder="Title"
            label="Education title"
            name="title"
            disabled={spinner}
            icon={<FaGraduationCap size={19} />}
          />
          <TextArea
            name="details"
            label="Education Description"
            placeholder="Description"
            disabled={spinner}
            icon={<FaPencilAlt size={19} />}
          />
          <Button
            className="w-full bg-pri hover:bg-pri/80 disabled:bg-pri/50"
            disabled={spinner}
            type="submit"
            size="sm"
          >
            {spinner ? <Spinner /> : "Add info"}
          </Button>
        </Form>
      </Formik>
      <Formik
        initialValues={initialSkillsValue}
        validationSchema={guideSchema}
        onSubmit={handleSkillsSubmit}
      >
        <Form className="space-y-2">
          <Input
            type="text"
            placeholder="Title"
            label="Skills title"
            name="title"
            disabled={spinner}
            icon={<FaGraduationCap size={19} />}
          />
          <TextArea
            name="details"
            label="Skills Description"
            placeholder="Description"
            disabled={spinner}
            icon={<FaPencilAlt size={19} />}
          />
          <Button
            className="w-full bg-pri hover:bg-pri/80 disabled:bg-pri/50"
            disabled={spinner}
            type="submit"
            size="sm"
          >
            {spinner ? <Spinner /> : "Add info"}
          </Button>
        </Form>
      </Formik>
      <Formik
        initialValues={initialExperienceValue}
        validationSchema={guideSchema}
        onSubmit={handleExperienceSubmit}
      >
        <Form className="space-y-2">
          <Input
            type="text"
            placeholder="Title"
            label="Experience title"
            name="title"
            disabled={spinner}
            icon={<FaGraduationCap size={19} />}
          />
          <TextArea
            name="details"
            label="Experience Description"
            placeholder="Description"
            disabled={spinner}
            icon={<FaPencilAlt size={19} />}
          />
          <Button
            className="w-full bg-pri hover:bg-pri/80 disabled:bg-pri/50"
            disabled={spinner}
            type="submit"
            size="sm"
          >
            {spinner ? <Spinner /> : "Add info"}
          </Button>
        </Form>
      </Formik>
    </>
  );
};

const UpdateGuideData = async (
  fieldName,
  data,
  setSpinner,
  resetForm,
  axiosSecure,
  user,
  userDetails,
  token,
  refetch,
) => {
  setSpinner(true);
  try {
    const { data: res } = await axiosSecure.patch(
      `/user/guide/${userDetails._id}?email=${user.email}`,
      {
        guideDetails: {
          [fieldName]: data,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.data?.modifiedCount) {
      Swal.fire({
        icon: "success",
        title: "Updated",
      });
    } else {
      Swal.fire({
        icon: "error",
        text: "Something went wrong",
      });
    }
    refetch();
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

export default UpdateProfile;
