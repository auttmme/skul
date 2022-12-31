import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import useFetch from "utils/useFetch";
import Layout from "/components/common/layout";
import Search from "/components/home/search";
import DataTable from "/components/home/table";

function Home() {
  const { data, isPending, error } = useFetch(
    "https://api.steinhq.com/v1/storages/63a5d577eced9b09e9ac9bcc"
  );

  return (
    <Box>
      <Layout>
        <Flex padding="8px" mb="16px">
          <Search />
          <FiFilter fontSize="24px" />
        </Flex>
        {data && <DataTable pending={isPending} data={data} />}
      </Layout>
    </Box>
  );
}

export default Home;
