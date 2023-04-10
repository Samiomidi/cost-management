import { Fragment } from "react";
import Head from "next/head";
import Dashboard from "./dashboard";
const Home = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Cost Management</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Great shopping cart project" />
      </Head>
      <Dashboard />
    </Fragment>
  );
};

export default Home;
