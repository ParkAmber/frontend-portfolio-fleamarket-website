import { useEffect } from "react";
import { useRouter } from "next/router";
import type { ReactElement, ComponentType } from "react";
import { useRecoilValueLoadable } from "recoil";
import { restoreAccessTokenLoadable } from "../../stores";

export const WithAuth =
  (Component: () => JSX.Element) =>
  <P extends {}>(Props: P): ReactElement<P> => {
    const router = useRouter();
    const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

  

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
