import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
const GLOBAL_STATE = new InMemoryCache(); 
interface IApolloSettingProps {
  children: JSX.Element;
}
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getAccessToken } from "../libraries/getAccessToken";
import { accessTokenState, restoreAccessTokenLoadable } from "../stores";
import { onError } from "@apollo/client/link/error";
export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

  useEffect(() => {

    console.log(accessToken);
    void aaa.toPromise().then((newAccessToken) => {
      console.log(newAccessToken);
      setAccessToken(newAccessToken ?? "");
    });
  }, []);
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    //1. error 
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        //1-2 graphQLErrors
        if (err.extensions.code === "UNAUTHENTICATED") {
          
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? "");
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, 
                  Authorization: `Bearer ${newAccessToken}`
                },
              });
            })
          ).flatMap(
            () => forward(operation) 
          );
        }
      }
    }
  });
  const uploadLink = createUploadLink({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include", //cookie에 저장될수있게 headers에 cookie포함시킴!
  });
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}


