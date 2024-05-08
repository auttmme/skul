// pages/_app.js
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import UserContextProvider from "utils/UserContext";
import Layout from "components/common/layout";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
