import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

function DataTable({ pending, data }) {
  const SteinStore = require("stein-js-client");
  const store = new SteinStore(
    "https://api.steinhq.com/v1/storages/63a5d577eced9b09e9ac9bcc"
  );

  console.log(data);

  const skele = [1, 2, 3, 4];

  const router = useRouter();

  const deleteData = (id) => {
    store
      .delete("Sheet1", {
        search: { id: id },
      })
      .then((res) => {
        console.log(res);
        router.push("/home");
      });
  };

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Nama Sekolah</Th>
              <Th>Jenis</Th>
              <Th>Alamat</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pending
              ? skele.map((s) => (
                  <Tr>
                    <Td>
                      <Skeleton height="10" />
                    </Td>
                    <Td>
                      <Skeleton height="10" />
                    </Td>
                    <Td>
                      <Skeleton height="10" />
                    </Td>
                    <Td>
                      <Skeleton height="10" />
                    </Td>
                    <Td>
                      <Flex>
                        <Skeleton height="16px" width="16px" />
                        <Skeleton ml="16px" height="16px" width="16px" />
                      </Flex>
                    </Td>
                  </Tr>
                ))
              : data?.map((d, index) => {
                  const { id, name, type, address, city, province } = d;
                  return (
                    <Tr key={id}>
                      <Td>{index + 1}</Td>
                      <Td>{name}</Td>
                      <Td>{type}</Td>
                      <Td>
                        {address}, {city}, {province}
                      </Td>
                      <Td>
                        <Flex>
                          {/* <Link>
                          </Link> */}
                          <Link href={`/skul/${id}`} key={id}>
                            <EditIcon />
                          </Link>
                          <Button onClick={() => deleteData(id)}>
                            <DeleteIcon />
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}

            {/* <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr> */}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DataTable;
