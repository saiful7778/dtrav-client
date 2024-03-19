import * as yup from "yup";

export const reviewSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  review: yup.string().required("Review text is required"),
});
