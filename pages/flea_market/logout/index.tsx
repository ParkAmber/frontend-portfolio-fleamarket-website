import { gql, useMutation, useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { IQuery } from "../../../src/commons/types/generated/types";
import {
  accessTokenState,
  visitedPageState,
} from "../../../src/component/stores";
export const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;
const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LogOut() {
  // const client = useApolloClient();
  const router = useRouter();
  const [logoutUser] = useMutation(LOGOUT_USER);
  //   headers:{Authorization: `Beraer ${access}`}
  const apolloClient = useApolloClient();
  const [access, setAccessToken] = useRecoilState(accessTokenState);
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);

  const onClickLogout = async () => {
    // setAccessToken("");
    // console.log(localStorage.getItem("acccessToken"), access);
    // setAccessToken("");
    //   apolloClient.clearStore();
    // localStorage.removeItem("accessToken");
    // console.log(access);
    const result = await logoutUser();

    // apolloClient.clearStore();
    console.log(result);
    //1. login mutation으로 access token 받아오기

    // localStorage.setItem("acccessToken", "");

    //   const accessToken = localStorage.getItem("acccessToken");
    //2. 받아온 access token을 global state에 저장하기

    alert("logout!!");
    setAccessToken("");
    void router.push("/flea_market");
    console.log(visitedPage);
    // localStorage.setItem("accessToken", accessToken); //보안상 좋지 않으므로 연습용으로 사용!!(나중에 바꿀것임!!)

    //3.로그인 성공페이지로 이동하기
    // void router.push(visitedPage);
    // console.log(visitedPage);
  };

  // useEffect(() => {
  //   console.log(localStorage.getItem("acccessToken"), access);
  //   setAccessToken("");
  //   //   apolloClient.clearStore();
  //   localStorage.removeItem("accessToken");
  //   console.log(access);
  //   apolloClient.clearStore();
  //   //1. login mutation으로 access token 받아오기
  //   const result = alogoutUser();
  //   //   localStorage.setItem("acccessToken", "");

  //   //   const accessToken = localStorage.getItem("acccessToken");
  //   //2. 받아온 access token을 global state에 저장하기

  //   alert("logout!!");
  //   void router.push(visitedPage);
  //   console.log(visitedPage);
  // }, []);
  return (
    <>
      <div onClick={onClickLogout}>LogOut</div>
    </>
  );
}
