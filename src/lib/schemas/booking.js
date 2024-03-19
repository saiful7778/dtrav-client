import * as yup from "yup";

export const bookingSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  image: yup
    .string()
    .url("Enter a valid URL")
    .required("Image link is required"),
  price: yup.number().required("Price is required"),
  tourGuideName: yup.string().required("Tour guide select is required."),
});
