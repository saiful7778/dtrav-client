import * as yup from "yup";

export const guideSchema = yup.object().shape({
  title: yup.string(),
  details: yup.string(),
});
