// import Banner from "./banner/index";
import Header from "./header";
// import Navigation from "./navigation";

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps) {
  return (
    <>
      <Header />
      {/* <Banner /> */}
      {/* <Navigation /> */}
      <div>{props.children}</div>{" "}
    </>
  );
}
