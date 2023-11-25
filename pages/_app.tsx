// import '@component/styles/globals.css'
import "../styles/style.css";
import "../styles/new.css";
import "../styles/detail.css";
import "../styles/detailComment.css";
import { RecoilRoot } from "recoil";
import ApolloSetting from "../src/component/apollo";
import Layout from "../src/commons/layout";
import { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
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
