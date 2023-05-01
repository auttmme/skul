// pages/_app.js
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import UserContextProvider from "utils/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
