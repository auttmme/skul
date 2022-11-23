import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";

function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Box display="flex" flexDirection={"column"}>
        <Input placeholder="username" size={"lg"} w={"2xl"} />
        <InputGroup size="lg" marginY={"3"}>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box alignSelf={"flex-end"}>
          <Link href={"/home"} passHref>
            <Button>Login</Button>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;
