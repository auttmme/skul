import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Link from "next/link";

function DataTable({ pending, data, setData }) {
  const SteinStore = require("stein-js-client");
  const store = new SteinStore(
    "https://api.steinhq.com/v1/storages/63a5d577eced9b09e9ac9bcc"
  );

  const skele = [1, 2, 3, 4];
  let copyData = data;

  const deleteData = (id) => {
    store
      .delete("Sheet1", {
        search: { id: id },
      })
      .then((res) => {
        copyData = data.filter((val) => val.id !== id);
        setData(copyData);
        return res;
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
              <Th>Jenjang Sekolah</Th>
              <Th>Jenis</Th>
              <Th>Alamat</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pending
              ? skele.map(() => (
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
              : copyData?.map((item, index) => {
                  const { id, name, level, type, address, city, province } =
                    item;
                  if (!id) return null;
                  return (
                    <Tr key={id}>
                      <Td>{index}</Td>
                      <Td>{name}</Td>
                      <Td>{level}</Td>
                      <Td>{type}</Td>
                      <Td>
                        {address}, {city}, {province}
                      </Td>
                      <Td>
                        <Flex>
                          <Link href={`/skul/${id}`} key={id}>
                            <Button>
                              <EditIcon />
                            </Button>
                          </Link>
                          <Button ml="16px" onClick={() => deleteData(id)}>
                            <DeleteIcon />
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DataTable;
