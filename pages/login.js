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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log(`${username} ${password}`);
  const test = false;

  console.log("test", !test);
  // test, true
  // if username length > 1 && password.length > 1 disabled false
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Box display="flex" flexDirection="column">
        <Input
          placeholder="username"
          size="lg"
          w="2xl"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputGroup size="lg" marginY="3">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box alignSelf="flex-end">
          <Link href="/home" passHref>
            <Button
              disabled={username.length < 1 || password.length < 1}
              onClick={() => alert(`${username} ${password}`)}
            >
              Login
            </Button>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;
