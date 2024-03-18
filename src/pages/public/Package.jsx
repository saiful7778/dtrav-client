import { Input } from "@/components/formik/Input";
import useAuth from "@/hooks/useAuth";
import axiosBase from "@/lib/config/axios.config";
import { bookingSchema } from "@/lib/schemas/booking";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Button, DatePicker, Spinner } from "keep-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaUserAstronaut,
  FaEnvelope,
  FaRegImage,
  FaDollarSign,
} from "react-icons/fa";
import Select from "@/components/formik/Select";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Package = () => {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const { user, token, userDetails } = useAuth();
  const { packageID } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: packageData,
    isLoading: packageLoading,
    isError: packageError,
  } = useQuery({
    queryKey: [packageID],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/package/${packageID}`);
      return data.data;
    },
  });

  const {
    data: guide,
    isLoading: guideLoading,
    isError: guideError,
  } = useQuery({
    queryKey: ["guide"],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/user/guide`);
      return data.data;
    },
  });

  if (packageLoading && guideLoading) {
    return (
      <div className="my-10 flex justify-center">
        <Spinner color="info" size="xl" />
      </div>
    );
  }

  if (packageError || guideError) {
    return (
      <div className="text-center text-xl font-bold">Something went wrong!</div>
    );
  }

  const { thumbnail, title, type, price, description, images } =
    packageData || {};

  const initialValues = {
    name: user?.displayName || "",
    email: user?.email || "",
    image: user?.photoURL || "",
    price: "",
    tourGuideName: "",
  };

  const tourGuideName = guide?.map((ele) => ({
    value: ele._id,
    text: ele.fullName.charAt(0).toUpperCase() + ele.fullName.slice(1),
  }));

  const handleSubmit = async (e) => {
    if (!user) {
      navigate("/authentication/login");
    }
    if (!date) {
      Swal.fire({
        icon: "error",
        text: "Please select or re-select date!",
      });
      return;
    }
    try {
      setSpinner(true);
      await axiosSecure.post(
        `/package?email=${user.email}`,
        {
          packageID,
          userID: userDetails._id,
          guideID: e.tourGuideName,
          price: e.price,
          tourData: date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Swal.fire({
        icon: "success",
        text: "Tour is booked",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err,
      });
    } finally {
      setSpinner(false);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-4 overflow-hidden">
        <figure>
          <img src={thumbnail} alt={title + " image"} />
        </figure>
        <div className="flex flex-wrap items-stretch gap-4">
          {images?.map((image, idx) => (
            <figure className="size-36" key={"img" + idx}>
              <img
                className="h-full w-full object-cover object-center"
                src={image.url}
                alt="image"
              />
            </figure>
          ))}
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="text-gray-700">
          <span className="font-bold">Type:</span> {type}
        </div>
        <div className="text-gray-700">
          <span className="font-bold">Price:</span> ${price}
        </div>
        <p>
          <span className="font-bold">About: </span>
          {description}
        </p>
      </div>
      <div>
        <h6 className="text-xl font-bold">Booking</h6>
        <Formik
          initialValues={initialValues}
          validationSchema={bookingSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-2">
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
            <Input
              type="url"
              placeholder="Image link"
              label="Your image"
              name="image"
              disabled={spinner}
              icon={<FaRegImage size={19} />}
            />
            <Input
              type="number"
              placeholder="Price"
              label="Price"
              name="price"
              disabled={spinner}
              icon={<FaDollarSign size={19} />}
            />
            <div>
              <div className="inline cursor-pointer select-none text-body-4 font-medium text-metal-600">
                Tour date
              </div>
              <DatePicker
                className="border-gray-400"
                singleDate={setDate}
                placeholder="Date / Month / Year"
              >
                <DatePicker.SingleDate />
              </DatePicker>
            </div>
            <div>
              <div className="inline cursor-pointer select-none text-body-4 font-medium text-metal-600">
                Tour guide name
              </div>
              <Select
                name="tourGuideName"
                defaultValue="--select-tour-guide-name"
                options={tourGuideName}
              />
            </div>
            <Button
              className="w-full bg-pri hover:bg-pri/80 disabled:bg-pri/50"
              disabled={spinner}
              type="submit"
              size="sm"
            >
              {spinner ? <Spinner /> : "Book now"}
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Package;
