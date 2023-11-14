import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
// import {
//   IMutation,
//   IMutationLoginUserArgs,
// } from "../../src/commons/types/generated/types";
import { useRecoilState } from "recoil";
import {
  accessTokenState,
  visitedPageState,
} from "../../../src/component/stores/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { schema } from "./02-after.validation";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../../src/commons/types/generated/types";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;
interface IFormData {
  email: string;
  pw: string;
}
export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm<IFormData>({
    //에러 메세지들
    resolver: yupResolver(schema),
    mode: "onChange", //onChange될때마다 채크해서 에러 메세지들 띄우기
  });

  const router = useRouter();

  // const [email, setEmail] = useState("");
  // const [pw, setPw] = useState("");
  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const [access, setAccessToken] = useRecoilState(accessTokenState);
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);
  // const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
  //   setEmail(e.target.value);
  // };
  // const onChangePw = (e: ChangeEvent<HTMLInputElement>): void => {
  //   setPw(e.target.value);
  // };
  const onClickLogin = async (data: IFormData) => {
    console.log(localStorage.getItem("acccessToken"));
    try {
      //1. login mutation으로 access token 받아오기
      const result = await loginUser({
        variables: { email: data.email, password: data.pw },
      });

      const accessToken = result.data?.loginUser.accessToken;
      console.log(accessToken);

      //2. 받아온 access token을 global state에 저장하기
      if (accessToken === undefined) {
        alert("Login fail!! please try again..");
        return;
      }
      setAccessToken(accessToken);
      // localStorage.setItem("accessToken", accessToken); //보안상 좋지 않으므로 연습용으로 사용!!(나중에 바꿀것임!!)

      //3.로그인 성공페이지로 이동하기
      void router.push(visitedPage);
      console.log(visitedPage);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return (
    <>
      {/* <div>hihi</div> */}
      <form onSubmit={handleSubmit(onClickLogin)} className='sign-up-con'>
        <div style={{ margin: "20px" }}>
          <p>Email</p> <input type='text' {...register("email")} />
          <p style={{ color: "red" }}>{formState.errors.email?.message}</p>
        </div>
        <div style={{ margin: "20px" }}>
          <p>Password</p> <input type='password' {...register("pw")} />
          <p style={{ color: "red" }}>{formState.errors.pw?.message}</p>{" "}
        </div>
        <div className='mt-60'>
          <button
            style={{ backgroundColor: formState.isValid ? "yellow" : "" }}
            className='submit-btn'>
            Login
          </button>
        </div>
      </form>

      {/* <div>
        email: <input type="text" onChange={onChangeEmail} />
      </div>
      <br />
      <div>
        password: <input type="password" onChange={onChangePw} />
      </div>
      <div>
        <button onClick={onClickLogin}>Login</button>
      </div> */}
    </>
  );
}
