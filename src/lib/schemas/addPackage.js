import * as yup from "yup";

export const addPackageSchema = yup.object().shape({
  thumbnail: yup.string().required("Thumbnail is required"),
  title: yup.string().required("Title is required"),
  type: yup.string().required("Type is required"),
  price: yup.number().required("Price is required"),
  description: yup.string().required("Description is required"),
  images: yup.string().required("image is required"),
});
