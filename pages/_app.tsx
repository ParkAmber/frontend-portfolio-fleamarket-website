// import '@component/styles/globals.css'
import "../styles/style.css";
import "../styles/new.css";
import "../styles/detail.css";
import "../styles/detailComment.css";
// import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { RecoilRoot } from "recoil";
import ApolloSetting from "../src/component/apollo";
import Layout from "../src/commons/layout";
import { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
  // const client = new ApolloClient({
  //   //uri: "http://practice.codebootcamp.co.kr/graphql/",
  //   uri: "http://backend-practice.codebootcamp.co.kr/graphql",
  //   // uri: "https://backendonline.codebootcamp.co.kr/graphql",
  //   // link: ApolloLink.from([errorLink, uploadLink]),
  //   cache: new InMemoryCache(), //컴퓨터의 메모리에 백앤드에서 받아온 데이터 임시저장(= 캐시)
  //   // cache: GLOBAL_STATE,
  // });
  return (
    <RecoilRoot>
      <ApolloSetting>
        <>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      </ApolloSetting>
    </RecoilRoot>
  );
}
