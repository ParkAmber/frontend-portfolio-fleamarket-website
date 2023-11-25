import * as yup from "yup";
export const schema = yup.object({
  // ** 에러 메세지들
  seller: yup.string().required("Please write seller name"),
  product: yup.string().required("Please write product name"),
  contents: yup.string().required("Please write contents"),
  price: yup.number().required("Please write price"),
  tags: yup.array().of(yup.string()).min(1, "At least one tag is required"),
  useditemAddress: yup.object().shape({
    address: yup.string().required("Address is required"),
  }),
});
