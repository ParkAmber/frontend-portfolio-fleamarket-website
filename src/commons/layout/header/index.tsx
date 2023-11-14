// import * as S from "../../styles/BoardMain.styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
  visitedPageState,
} from "../../../component/stores";
import { useEffect } from "react";
import { IQuery } from "../../types/generated/types";
import { useMoveToPage } from "../../hooks/customs/useMoveToPage";
import { useAuth } from "../../hooks/customs/useAuth";
const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

import { useApolloClient } from "@apollo/client";

export const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

export default function Header() {
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const router = useRouter();
  const { onClickMoveToPage, visitedPage } = useMoveToPage();
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);
  useEffect(() => {
    console.log("accessToken: ", accessToken);
  }, []);
  // useAuth();

  const [logoutUser] = useMutation(LOGOUT_USER);
  //   headers:{Authorization: `Beraer ${access}`}
  const apolloClient = useApolloClient();

  // const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);

  const onClickLogout = async () => {
    const result = await logoutUser();
    console.log(result);
    alert("logout!!");
    setAccessToken("");
    void router.push("/flea_market");
    console.log(visitedPage);
  };
  return (
    <div>
      <section className='header'>
        <h1 style={{ textDecoration: "none" }}>
          <Link href='/flea_market'>
            <a>FLEAMARKET</a>
          </Link>
        </h1>

        <div className='profile'>
          <div className='profile-item'>
            {accessToken ? (
              // <Link href='/flea_market/logout'>
              //   <a>Logout</a>
              // </Link>

              <a onClick={onClickLogout}>Logout</a>
            ) : (
              <Link href='/flea_market/login'>
                <a>Login</a>
              </Link>
            )}
          </div>
          <div className='profile-item'>
            {accessToken ? (
              // <Link href='/flea_market/logout'>
              //   <a>Logout</a>
              // </Link>

              <></>
            ) : (
              <Link href='/flea_market/signup'>
                <a>Sign Up</a>
              </Link>
            )}
            {/* <Link href='/flea_market/signup'>
              <a>Sign Up</a>
            </Link> */}
          </div>
          {/* <div className="profile-item">Customer</div> */}
        </div>
      </section>
      <section className='nav'>
        <ul className='nav-container'>
          <li style={{ fontWeight: "bold" }}>Category</li>
          <Link href='/flea_market/products/new'>
            <li onClick={onClickMoveToPage("/flea_market/products/new")}>
              Post
            </li>
          </Link>
          <Link href='/flea_market/products/new'>
            <li onClick={onClickMoveToPage("/flea_market/products/new")}>
              Products
            </li>
          </Link>
          <Link href='/flea_market/products/list'>
            <li onClick={onClickMoveToPage("/flea_market/products/list")}>
              List
            </li>
          </Link>
        </ul>
      </section>
    </div>
  );
}
