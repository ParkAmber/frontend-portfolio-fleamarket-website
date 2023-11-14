import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IQuery } from "../../../src/commons/types/generated/types";
// import { IQuery } from "../../src/commons/types/generated/types";
import { WithAuth } from "../../../src/component/apollo/hocs/loginCheck";
import { wrapAsync } from "../../../src/component/libraries/asyncFunc";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

// function LoginPageSuccess(): JSX.Element {
//   const { data } =
//     useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
//   console.log(data?.fetchUserLoggedIn.name);
//   return (
//     <>
//       <p>HIHI</p>
//       <div>Welcome, {data?.fetchUserLoggedIn.name}!!</div>
//     </>
//   );
// }

// export default WithAuth(LoginPageSuccess);

function LoginPageSuccess(): JSX.Element {
  // ** apollo server에서 data받아오는 방법!! ** //
  // 1. 페이지에 접속하면 자동으로 데이터에 받아지고, 데이터는 global state에 저장!!, 그리고 리랜더링 됨!!
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  //2. 버튼 클릭시 데이터에 받아지고, 데이터는 global state에 저장!!, 그리고 리랜더링 됨!!
  //const [나의함수, { data }] = useLazyQuery(FETCH_USER_LOGGED_IN);

  // 3. axios처럼 사용하는 방법!!, 데이터는 global state에 저장!!
  // const client = useApolloClient()
  // client.query() (==>axios.get()와 같은 의미)
  // return (
  //   <>
  //     <div>Welcome, {data?.fetchUserLoggedIn.name}!!</div>
  //   </>
  // );
  // const router = useRouter();
  // const { data } =
  //   useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  // useEffect(() => {
  //   if (localStorage.getItem("accessToken") === null) {
  //     alert("Login후에 이용가능!");
  //     void router.push("/class23-03-login-check");
  //   }
  // }, []);
  const client = useApolloClient();
  const onClickButton = async (): Promise<void> => {
    const result = await client.query({
      query: FETCH_USER_LOGGED_IN,
    });
    console.log(result);
  };

  return (
    <>
      <button onClick={wrapAsync(onClickButton)}>Click Me</button>
      <div>Welcome, {data?.fetchUserLoggedIn.name}!!</div>
    </>
  );
}
export default WithAuth(LoginPageSuccess);
// export default function LoginPage(): JSX.Element {
//   const router = useRouter();
//   const { data } =
//     useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
//   useEffect(() => {
//     if (localStorage.getItem("accessToken") === null) {
//       alert("Login후에 이용가능!");
//       void router.push("/class23-03-login-check");
//     }
//   }, []);
//   return (
//     <>
//       <div>Welcome, {data?.fetchUserLoggedIn.name}!!</div>
//     </>
//   );
// }
