import { useEffect } from "react";
import { useRouter } from "next/router";
import type { ReactElement, ComponentType } from "react";
import { useRecoilValueLoadable } from "recoil";
import { restoreAccessTokenLoadable } from "../../stores";
// import { getAccessToken } from "../../../commons/libraries/getAccessToken";
// import { useRecoilValueLoadable } from "recoil";
// import { restoreAccessTokenLoadable } from "../../../commons/stores";

export const WithAuth =
  (Component: () => JSX.Element) =>
  <P extends {}>(Props: P): ReactElement<P> => {
    const router = useRouter();
    const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

    //1. login check(refresh token 배우기 전 방식)
    // useEffect(() => {
    //   if (localStorage.getItem("accessToken") === null) {
    //     alert("Please login first!");
    //     void router.push("/flea_market/login");
    //   }
    // }, []);
    // useEffect(() => {
    //   console.log("지금은 브라우저다!222");
    //   const result = localStorage.getItem("accessToken"); //=>1.  임시 방법
    //   // void aaa.toPromise().then((newAccessToken) => {
    //   //   setAccessToken(newAccessToken ?? "");
    //   // });
    //   // void getAccessToken().then((newAccessToken) => {
    //   //   console.log(newAccessToken);
    //   //   setAccessToken(newAccessToken ?? "");
    //   // }); //=> 2. refresh token
    //   if (result !== null) setAccessToken(result);
    //   console.log(accessToken);
    // }, []);
    //2. login check(refresh token 배우고 이후 방식) => but 나쁜방식(_app.tsx에 이어서 총 2번 요청 날리게 되므로)
    // useEffect(() => {
    //   void getAccessToken().then((newAccessToken) => {
    //     if (newAccessToken === undefined) {
    //       alert("Login후에 이용가능!");
    //       void router.push("/class23-05-login-check-hoc");
    //     }
    //   }); //2. refresh token
    // }, []);

    //3. login check(refresh token 배우고 이후 방식) => 좋은 방식(함수를 공유하므로써 _app.tsx에 이아서 총 1번만 요청 날리게 되므로)
    useEffect(() => {
      void aaa.toPromise().then((newAccessToken) => {
        console.log(newAccessToken);
        if (newAccessToken === undefined) {
          alert("Plaese login first222!");
          void router.push("/flea_market/login");
        }
      });
    }, []);
    return <Component {...Props} />; //{...프롭스} ==> ex) apple = {3}, banana = {2}와 같은 뜻!
  };
