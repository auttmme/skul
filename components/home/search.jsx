import React from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function Search() {
  return (
    <Flex w="full" justifyContent="center">
      <InputGroup w="4xl">
        <InputRightElement pointerEvents="none">
          <SearchIcon />
        </InputRightElement>
        <Input type="tel" placeholder="Search" />
      </InputGroup>
    </Flex>
  );
}

export default Search;
