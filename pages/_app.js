// pages/_app.js
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import UserContextProvider from "utils/UserContext";
import Layout from "components/common/layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const isUnrestrictedRoute = router.pathname === "/";

  const renderLayout = !isUnrestrictedRoute ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <ChakraProvider>
      <UserContextProvider>{renderLayout}</UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
