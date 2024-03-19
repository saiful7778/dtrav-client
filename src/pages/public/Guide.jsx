import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Spinner } from "keep-react";
import { useParams } from "react-router-dom";
import { FaUserAstronaut, FaEnvelope, FaPencilAlt } from "react-icons/fa";
import { Form, Formik } from "formik";
import { Input } from "@/components/formik/Input";
import { useState } from "react";
import TextArea from "@/components/formik/TextArea";
import useAuth from "@/hooks/useAuth";
import { reviewSchema } from "@/lib/schemas/review";
import Swal from "sweetalert2";

const Guide = () => {
  const { guideID } = useParams();
  const { user, userDetails, token } = useAuth();
  const [spinner, setSpinner] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {
    data: guideData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["guide", "details"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/guide/${guideID}`);
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

  const initialValue = {
    name: user?.displayName || "",
    email: user?.email || "",
    review: "",
  };

  const handleSubmit = async (e, { resetForm }) => {
    setSpinner(true);
    try {
      const { data } = await axiosSecure.post(
        `/user/guide/review/${guideID}?email=${user.email}`,
        {
          userID: userDetails._id,
          reviewData: e.review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Successful",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
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
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="size-36 flex-shrink-0 overflow-hidden rounded-full bg-gray-300">
        {guideData?.image ? (
          <img
            className="h-full w-full object-cover object-center"
            src={guideData.image}
            alt={guideData.fullName}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FaUserAstronaut size={120} />
          </div>
        )}
      </div>
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="text-xs font-bold">Name</div>
          <div>{guideData.fullName}</div>
        </div>
        <div>
          <div className="text-xs font-bold">Contact</div>
          <div>{guideData.email}</div>
        </div>
        <div>
          <div className="text-xs font-bold">Education</div>
          <div className="mt-2 text-xs font-bold">Title</div>
          <div className="text-gray-600">
            {guideData?.guideDetails?.education?.title}
          </div>
          <div className="text-xs font-bold">Details</div>
          <div className="text-gray-600">
            {guideData?.guideDetails?.education?.details}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Skills</div>
          <div className="mt-2 text-xs font-bold">Title</div>
          <div className="text-gray-600">
            {guideData?.guideDetails?.skills?.title}
          </div>
          <div className="text-xs font-bold">Details</div>
          <div className="text-gray-600">
            {guideData?.guideDetails?.skills?.details}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold">Experience</div>
          <div className="mt-2 text-xs font-bold">Title</div>
          <div className="text-gray-600">
            {guideData?.guideDetails?.experience?.title}
          </div>
          <div className="text-xs font-bold">Details</div>
          <div className="text-gray-600">
            {guideData?.guideDetails?.experience?.details}
          </div>
        </div>
        <Formik
          initialValues={initialValue}
          validationSchema={reviewSchema}
          onSubmit={handleSubmit}
        >
          <Form className="col-span-2 space-y-2">
            <Input
              type="text"
              placeholder="Full name"
              label="Your name"
              name="name"
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
            <TextArea
              name="review"
              label="Review details"
              placeholder="Details"
              disabled={spinner}
              icon={<FaPencilAlt size={19} />}
            />
            <Button
              className="w-full bg-pri hover:bg-pri/80 disabled:bg-pri/50"
              disabled={spinner}
              type="submit"
              size="sm"
            >
              {spinner ? <Spinner /> : "Review"}
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Guide;
