import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Link as ChakraLink,
  Flex,
  FormControl,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
        router.push("/home");
      }, 3000);
    });
    // console.log(values);
    // alert(JSON.stringify(values, null, 2));
  }

  // if username length > 1 && password.length > 1 disabled false
  // const disable = username.length > 1 && password.length > 1;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        isInvalid={errors.name}
        display="flex"
        h="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Box display="flex" flexDirection="column">
          <Input
            {...register("username")}
            placeholder="username"
            size="lg"
            w="2xl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputGroup size="lg" marginY="3">
            <Input
              {...register("password")}
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
            {/* <Link href="/home" passHref>
              <Button
                type="submit"
                disabled={username.length < 1 || password.length < 1}
                // disabled={!disable}
              >
                Login
              </Button>
            </Link> */}
            <Button
              type="submit"
              disabled={username.length < 1 || password.length < 1}
              isLoading={isSubmitting}
              // disabled={!disable}
              // onClick={() => alert(`${username} ${password}`)}
            >
              Login
            </Button>
          </Box>
        </Box>
      </FormControl>
    </form>
  );
}

export default Login;
