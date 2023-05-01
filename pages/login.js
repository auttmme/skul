import React, { useContext, useState } from "react";
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
import { UserContext } from "utils/UserContext";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function onSubmit() {
    return new Promise(() => {
      setTimeout(() => {
        login(username);
        router.push("/home");
      }, 3000);
    });
  }

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
            <Button
              type="submit"
              disabled={username.length < 1 || password.length < 1}
              isLoading={isSubmitting}
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
