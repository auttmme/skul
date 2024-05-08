import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import useFetch from "utils/useFetch";
import { UserContext } from "utils/UserContext";
import Search from "/components/home/search";
import DataTable from "/components/home/table";

function Home() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const { allData, isPending } = useFetch(
    "https://api.steinhq.com/v1/storages/63a5d577eced9b09e9ac9bcc"
  );

  const [dataStein, setDataStein] = useState();

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      setDataStein(allData);
    }
  }, [allData, user]);

  return (
    <Box>
      <Flex padding="8px" mb="16px" alignItems="center" gap={8}>
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
    </Box>
  );
}

export default Home;
