import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import useFetch from "utils/useFetch";
import { UserContext } from "utils/UserContext";
import Layout from "/components/common/layout";
import Search from "/components/home/search";
import DataTable from "/components/home/table";

function Home() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  const { allData, isPending, error } = useFetch(
    "https://api.steinhq.com/v1/storages/63a5d577eced9b09e9ac9bcc"
  );

  const [dataStein, setDataStein] = useState();

  useEffect(() => {
    setDataStein(allData);
    console.log("allData", allData);
    console.log("dataStein", dataStein);
  }, [allData]);

  return (
    <Box>
      <Layout>
        <Flex padding="8px" mb="16px">
          <Search />
          <FiFilter fontSize="24px" />
        </Flex>
        {dataStein && (
          <DataTable
            pending={isPending}
            data={dataStein}
            setData={setDataStein}
          />
        )}
      </Layout>
    </Box>
  );
}

export default Home;
