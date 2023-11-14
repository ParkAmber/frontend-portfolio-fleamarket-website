import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationCreateUserArgs,
} from "../../../src/commons/types/generated/types";
// import {
//   IMutation,
//   IMutationCreateUserArgs,
//   IMutationLoginUserArgs,
// } from "../../src/commons/types/generated/types";
// import { useRecoilState } from "recoil";
// import { accessTokenState } from "../../src/component/commons/stores";
import * as S from "../../../styles/BoardMain.styles";
const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;
export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");

  const [myFunction] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onClickSignUp = async (): Promise<void> => {
    if (email && pw) {
      try {
        const result = await myFunction({
          variables: {
            createUserInput: {
              email: email,
              password: pw,
              name: name,
            },
          },
        });
        alert(result.data?.createUser._id);
        alert("Sign Up Success!. Please Login");
        console.log(result.data);

        void router.push(`/flea_market/login`);
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };
  return (
    <>
      <div className='sign-up-con'>
        {/* <div>hihi</div> */}
        <div style={{ margin: "20px" }}>
          <p>email</p>{" "}
          <input
            type='text'
            onChange={onChangeEmail}
            placeholder='please enter your email'
          />
          <br />
        </div>
        <div style={{ margin: "20px" }}>
          <p>password</p>{" "}
          <input
            type='password'
            onChange={onChangePw}
            placeholder='please enter your password'
          />
          <br />
        </div>
        <div style={{ margin: "20px" }}>
          <p>name</p>{" "}
          <input
            type='text'
            onChange={onChangeName}
            placeholder='please enter your name'
          />
          <br />
        </div>
        <div className='mt-60'>
          <button onClick={onClickSignUp} className='submit-btn'>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}
