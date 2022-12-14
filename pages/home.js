import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { FiFilter } from "react-icons/fi";
import Layout from "/components/common/layout";
import Search from "/components/home/search";
import DataTable from "/components/home/table";

function Home() {
  return (
    <Box>
      <Layout>
        <Flex padding="8px" mb="16px">
          <Search />
          <FiFilter fontSize="24px" />
        </Flex>
        <DataTable />
      </Layout>
    </Box>
  );
}

export default Home;
