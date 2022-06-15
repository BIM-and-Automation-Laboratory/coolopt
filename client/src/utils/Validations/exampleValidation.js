import * as yup from "yup";

export const exampleSchema = yup.object().shape({
  title: yup.string().required("The title of the component is required"),
  description: yup.string(),
});