import { Fragment } from "react";
import ThemeSwitch from "../components/ui/ThemeSwitch";
import Head from "next/head";
import styled from "styled-components";
import DrawerMenu from "../components/DrawerMenu";
const Home = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Shopping Cart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Great shopping cart project" />
      </Head>
      {/* Sidebar */}
      {/* <drawerMenu /> */}
      <SideMenu>
        <DrawerMenu />
      </SideMenu>
      {/* Middle Bar */}
      {/* Right Bar */}
    </Fragment>
  );
};

const SideMenu = styled.div`
  right: 0;
  top: 0;
  width: 500px;
`;
export default Home;
