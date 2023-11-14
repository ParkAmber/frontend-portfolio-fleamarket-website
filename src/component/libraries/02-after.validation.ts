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
  // //이메일 검증
  // email: yup
  //   .string()
  //   .email("email형식에 적합하지 않음")
  //   .required("email를 입력해주세여"),
  // //비번 검증
  // password: yup
  //   .string()
  //   .min(4, "please 4자리 이상으로 입력해라")
  //   .max(15, "please 15자리 이하로 입력해라")
  //   .required("password를 입력해주세여"),

  // phone: yup
  //   .string()
  //   .matches(/^\d{3}-\d{3,4}-\d{4}$/, "형식에 맞게 입력해라")
  //   .required("phone를 입력해주세여"),
});
